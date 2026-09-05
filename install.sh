# 1、更改源
# 2、更新源
sudo apt update

# 3、安装docker
# 3.1、安装依赖
sudo apt install -y ca-certificates curl gnupg lsb-release
# 3.2、添加阿里云Docker GPG密钥
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg -n
sudo chmod a+r /etc/apt/keyrings/docker.gpg
# 3.3、写入阿里云docker apt源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# 3.4、更新缓存，安装最新稳定版（自动大于17.09，完美支持compose 3.4）
sudo apt update -y
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
# 3.5、启动&开机自启
sudo systemctl daemon-reload
sudo systemctl start docker
sudo systemctl enable docker
# 3.6、验证版本
docker --version
docker compose version

# 4、配置Docker国内镜像源加速器
sudo mkdir -p /etc/docker
sudo touch /etc/docker/daemon.json
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://docker.m.daocloud.io",
    "https://dockerproxy.net",
    "https://hub-mirror.c.163.com"
  ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

# 5、编译
cd ./kdex-api
sudo docker compose up --build
