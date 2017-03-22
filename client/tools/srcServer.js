
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webPackDevServer from 'webpack-dev-server';
import {chalkSuccess} from './chalkConfig';
import path from 'path';


new webPackDevServer(webpack(config),{
  contentBase: path.resolve(__dirname, '../src'),
  hot: true,
  historyApiFallback: true,
}).listen(3010, 'localhost', function(err){
    if (err) {
      return console.log(err);
    }
    console.log(chalkSuccess('listening at http://localhost:3010'));
});

