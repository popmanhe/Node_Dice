
function SocketThrottle(config) {
    let self = this;
    this.rateLimit = 10 || config.rateLimit;
    this.suspensionTime = config.suspensionTime * 60;
    this.period = config.period;
    this.users = {};
    this.whiteIP = config.whiteIP || [];
    // remove user who has been idle for 10 minutes
    let cleanUp =  ()=> {
        setInterval( () => {
            for (let property in self.users) {
                if (self.users.hasOwnProperty(property)) {
                    let user = self.users[property];
                    let timeDiff = Date.now() - user.lastAccessTime;
                    if (timeDiff > 10 * 60 * 1000)//idle after 10 minutes, remove from object
                        delete self.users[property];
                }
            }
        } , 10 * 1000);
    };
    cleanUp();
}

SocketThrottle.prototype.Check =  (ID) => {
  
    let self = this;
    if (ID === undefined || ID == '') return true;
    //in white list, always return true
    if (self.whiteIP.indexOf(ID) > -1) return true;
    
    let user = self.users[ID];
    if (user) {
        let timeDiff = Date.now() - user.lastAccessTime;
        if (timeDiff < self.period * 1000) {
            if (user.times >= self.rateLimit) {
                return false;
            }
            else {
                user.times += 1;
                return true;
            }
        } 
        else if (timeDiff >= self.period * 1000 && timeDiff < self.suspensionTime * 1000) {
            if (user.times >= self.rateLimit) {
                return false;
            }
            else {
                user.times = 1;
                user.lastAccessTime = Date.now();
                return true;
            }
        } else if (timeDiff >= self.suspensionTime * 1000) {
            user.lastAccessTime = Date.now();
            user.rateLimit = 1;
            return true;
        }
    }
    else {//first request
        self.users[ID] = {
            lastAccessTime : Date.now()       ,
            rateLimit : 1
        };
        return true;
    }
};

export default SocketThrottle;