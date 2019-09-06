const gulp=require('gulp');//引入gulp模块 gulp对象
const html=require('gulp-minify-html');//引入gulp-minify-html模块
const css=require('gulp-minify-css');//引入gulp-minify-css模块
const js=require('gulp-uglify');//引入gulp-uglify模块
const watch=require('gulp-watch');//引入gulp-watch模块
const sass=require('gulp-sass');
const babel=require('gulp-babel');
const bablecore = require('babel-core'); //es6转es5主要模块
const es2015 = require('babel-preset-es2015'); //es6转es5主要模块
const imagemin=require('gulp-imagemin');
const sourcemaps=require('gulp-sourcemaps');
const concat=require('gulp-concat')
// gulp.task('default',function(){//默认的任务名称：default 编译的时候只需要写gulp ，回调函数
//     console.log('hello,gulp')
// })
//文件的复制
// gulp.task('copyfile',function(){
//     return gulp.src('src/img')
//     .pipe(gulp.dest('dist/img'));
// });
//css文件的压缩
// gulp.task('uglifycss',function(){
//     return gulp.src('src/css/*.css')
//     .pipe(css())
//     .pipe(gulp.dest('dist/css'))
// });
//js的压缩
// gulp.task('uglifyjs',function(){
//     return gulp.src('src/js/*.js')
//     .pipe(js())
//     .pipe(gulp.dest('dist/js'))
// });
// //es6转es5
// gulp.task('babel',function(){
//     return gulp.src('src/js/*.js')
//     .pipe(babel({
//         presets:['es2015']
//     }))
//     .pipe(gulp.dest('dist/js/'));
// });


//html文件的压缩
gulp.task('uglifyhtml',function(){
    return gulp.src('src/*.html')
    .pipe(html())
    .pipe(gulp.dest('dist/'))
});

//转码，压缩的合并实现
gulp.task('babel', function () {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(js())
        .pipe(gulp.dest('dist/js/'));
});
//转码，压缩的合并实现
gulp.task('runsass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        })) //执行编译,compressed:压缩一行
        .pipe(gulp.dest('dist/css/'));
});


//png图片的压缩
// gulp.task('runimg',function(){
// 	return gulp.src('src/img/*.png')
// 	.pipe(imagemin())
// 	.pipe(gulp.dest('dist/img/'));
// });

//监听
gulp.task('watch',function(){
    watch(['src/*.html','src/scss/*.scss','src/js/*.js'],gulp.parallel('uglifyhtml','runsass','babel'));  
	//watch的第一个参数监听的文件的路径，第二个参数是监听运行的任务名
	//gulp.parallel() –并行运行任务 
})