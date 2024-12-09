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

check_folder() {
	folder=$1
	if [ -d $folder ]; then
		sub_log "文件夹已存在：${folder}"
	else
		mkdir ${folder}
		sub_log "文件夹已创建：${folder}"
	fi
}

log "开始执行打包"

sub_log "打包单文件"
npm run build:ncc

check_folder ./dist.sea
check_folder ./dist.sea/run

sub_log "拷贝配置到待打包目录"
cp -R ./config ./dist.sea
cp -R ./dist.ncc/run/build ./dist.sea/run

sub_log "生成sea可执行文件"
echo "const { createRequire } = require('node:module');\nrequire = createRequire(__filename);\n\n" >temp
cat temp ./dist.ncc/run/index.js >./dist.sea/run/index.js
rm -rf temp

sub_log "生成blob文件"
node --experimental-sea-config ./sea/config.json

sub_log "创建node可执行文件的副本并根据需要命名"
cp $(command -v node) ./dist.sea/run/index

sub_log "删除二进制文件的签名"
codesign --remove-signature ./dist.sea/run/index

sub_log "将blob注入到复制的二进制文件中"
npx postject ./dist.sea/run/index NODE_SEA_BLOB ./dist.sea/run/prep.blob \
	--sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
	--macho-segment-name NODE_SEA

sub_log "签署二进制文件"
codesign --sign - ./dist.sea/run/index

log "打包成功"