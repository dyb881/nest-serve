platform=$1 # linux-x64 win-x64 darwin-arm64

delimiter="################################################################"
dividingLine="----------------------------------------------------------------"

log() {
	datetime=$(date +'%F %H:%M:%S')
	echo "\033[32m"
	printf "\n%s\n" "${delimiter}"
	printf "${datetime}\t$1"
	printf "\n%s\n" "${delimiter}"
	echo "\033[0m"
}

sub_log() {
	datetime=$(date +'%F %H:%M:%S')
	printf "\n%s\n" "${dividingLine}"
	printf "${datetime}\t$1"
	printf "\n%s\n" "${dividingLine}"
}

log "开始执行打包"

sub_log "删除上一次打包"
rm -rf ./dist.sea

sub_log "打包单文件"
npm run build
node_modules/.bin/ncc build ./dist/main.js -o dist.sea/run

sub_log "拷贝配置到待打包目录"
cp -R ./config ./dist.sea

sub_log "生成sea可执行文件"
echo "const { createRequire } = require('node:module');\nrequire = createRequire(__filename);\n\n" >temp
cat temp ./dist.sea/run/index.js >./dist.sea/run/nest-serve.js
rm -rf temp

sub_log "生成sea可执行文件"
xsea ./dist.sea/run/nest-serve.js -o ./dist.sea/run/nest-serve -t ${platform}

sub_log "下载 sqlite 预构建文件"
sqlite_file_name=$platform
if [ $platform == 'win-x64' ]; then
	sqlite_file_name='win32-x64'
elif [ $platform == 'win-x86' ]; then
	sqlite_file_name='win32-ia32'
fi
sqlite_file_url="https://github.com/TryGhost/node-sqlite3/releases/download/v5.1.7/sqlite3-v5.1.7-napi-v6-${sqlite_file_name}.tar.gz"
sqlite_file_path="./dist.sea/run/sqlite3.tar.gz"
wget ${sqlite_file_url} -O ${sqlite_file_path}

sub_log "解压 sqlite"
tar -zxf ${sqlite_file_path}
rm -rf ${sqlite_file_path}

log "打包成功"
