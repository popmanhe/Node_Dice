import React from 'react';
import OUBet from './OUBet';
import AutoBet from './AutoBet';
import Chat from './Chat';
const HomePage = () => {
    return (
        <div className="row">
            <div className="col-sm-9 col-md-9 col-lg-9">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        Header
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-8">
                                <OUBet />
                            </div>
                            <div className="col-md-4">
                                <AutoBet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
                <Chat />
            </div>

        </div>
    );
};
export default HomePage;
