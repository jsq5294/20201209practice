const path=require('path');//加载path模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports={
    //mode:'production',// 模式 production 生产环境  development 开发环境
    entry:{
      index:'./css/index.js',
      product:'./css/product.js'
    },//入口 上级一个点.
    output:{//打包出口
        path:path.resolve(__dirname,'../dist/'), //打包文件输出路径 绝对路径 获取当前绝对路径
        //filename:'bundle.js'// 打包文件输出名称. 指定名称
        filename:'[name].[hash].js' //[name]  [hash] hash码 入口文件如果被修改了 hash会重新生成.
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000,
      open:true
    },
    module:{
      rules:[
        {
        test:/\.css$/,
          use:[
            {loader:miniCssExtractPlugin.loader},
            {loader:'css-loader'}
          ]
        },
        {
          test:/\.less$/,
          use:[
            {loader:miniCssExtractPlugin.loader},
            {loader:'css-loader'},
            {loader:'less-loader'}
          ]
        },
        {
          test:/\.(jpg|png|gif|webp|jpeg)$/,
          use:[
            {
              loader:'url-loader',
              options:{
                limit:102400
              }
            }
          ]
        },
        {
          test:/\.js$/,
          use:[
            {
              loader:'babel-loader',
              options:{
                presets:['env']
              }
            }
          ]
        }
      ]
    },
    plugins:[
      new HtmlWebpackPlugin({
        title:"Document",
        template: './index.html',
        inject: 'body',
        minify: {
          removeComments: true,//是否移除注释
          removeAttributeQuotes: true,//是否移除属性的引号
          collapseWhitespace: true//是否移除空白
        },
        filename: 'index_1.html'
      }),
      new miniCssExtractPlugin({
        filename:'[name].[hash].css'
      })
    ]
}