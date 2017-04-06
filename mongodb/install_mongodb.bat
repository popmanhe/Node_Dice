d:
mkdir \mongodb\logs
mkdir \mongodb\data
echo logpath=D:\mongodb\logs\mongod.log> "d:\mongodb\mongod.cfg"
echo dbpath=D:\mongodb\data\>> "d:\mongodb\mongod.cfg"
sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe\" --service --config=\"d:\mongodb\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
sc start mongoDB