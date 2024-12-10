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

check_folder() {
	folder=$1
	if [ -d $folder ]; then
		sub_log "文件夹已存在：${folder}"
	else
		mkdir ${folder}
		sub_log "文件夹已创建：${folder}"
	fi
}

log "预构建项目执行代码"

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

sub_log "生成blob文件"
echo '{"main": "./dist.sea/run/nest-serve.js","output": "./dist.sea/run/prep.blob","disableExperimentalSEAWarning": true}' >./config.json
node --experimental-sea-config ./config.json
rm -rf ./config.json

log "下载打包资源"

check_folder ./cache

node_version=$(node -v)                               # node 版本
node_platform_path="node-${node_version}-${platform}" # 分发版本路径
node_file_suffix="tar.gz"                             # 压缩包后缀
if [ $platform == 'win-x64' ]; then
	node_file_suffix="zip"
fi
node_zip_path="./cache/${node_platform_path}.${node_file_suffix}" # 压缩包文件名

if [ -d "./cache/${node_platform_path}" ]; then
	sub_log "${node_platform_path}已存在"
else
	sub_log "下载${node_platform_path}"
	wget "https://nodejs.org/dist/${node_version}/${node_platform_path}.${node_file_suffix}" -O ${node_zip_path}

	sub_log "解压${node_platform_path}"
	if [ $platform == 'win-x64' ]; then
		unzip ${node_zip_path}
	else
		tar -zxf ${node_zip_path}
	fi
	mv ./${node_platform_path} ./cache/${node_platform_path}
  rm -rf ${node_zip_path}
fi

sub_log "创建node可执行文件的副本并根据需要命名"
node_file_name="bin/node" # node 可执行文件名
run_file="nest-serve"     # 拷贝后的执行文件名
if [ $platform == 'win-x64' ]; then
	node_file_name="node.exe"
	run_file="nest-serve.exe"
fi
cp ./cache/${node_platform_path}/${node_file_name} ./dist.sea/run/${run_file}

if [ $platform == 'darwin-arm64' ]; then
	sub_log "删除二进制文件的签名"
	codesign --remove-signature ./dist.sea/run/${run_file}
fi

sub_log "将blob注入到复制的二进制文件中"
npx postject ./dist.sea/run/${run_file} NODE_SEA_BLOB ./dist.sea/run/prep.blob \
	--sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
	--macho-segment-name NODE_SEA

if [ $platform == 'darwin-arm64' ]; then
	sub_log "签署二进制文件"
	codesign --sign - ./dist.sea/run/${run_file}
fi

sub_log "下载 sqlite 预构建文件"
sqlite_file_name=$platform
if [ $platform == 'win-x64' ]; then
	sqlite_file_name='win32-x64'
fi
sqlite_file_name="sqlite3-v5.1.7-napi-v6-${sqlite_file_name}"

if [ -d "./cache/${sqlite_file_name}" ]; then
	sub_log "${sqlite_file_name}已存在"
else
	sub_log "下载${sqlite_file_name}"
	sqlite_file_url="https://github.com/TryGhost/node-sqlite3/releases/download/v5.1.7/${sqlite_file_name}.tar.gz"
	sqlite_zip_path="./cache/${sqlite_file_name}.tar.gz"

	wget ${sqlite_file_url} -O ${sqlite_zip_path}

	sub_log "解压${sqlite_file_name}"
	mkdir ./cache/${sqlite_file_name}
	tar -zxf $sqlite_zip_path -C ./cache/$sqlite_file_name
	rm -rf $sqlite_zip_path
fi

cp -R ./cache/${sqlite_file_name}/build ./dist.sea/run

log "打包成功"
