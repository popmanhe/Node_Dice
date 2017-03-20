
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webPackDevServer from 'webpack-dev-server';

new webPackDevServer(webpack(config),{
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(3010, 'localhost', function(err){
    if (err) {
      return console.log(err);
    }

    console.log('listening at http://localhost:3010');
});

