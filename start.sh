docker build -t dashboard .
docker stop dashboard
docker rm dashboard
rm -rf /tmp/dashboard/*
docker run --name=dashboard --privileged=true  dashboard
docker cp front:/usr/src/app/distr /tmp/dashboard
mkdir -p /var/www/dashboard
cp -Rf /tmp/dashboard/distr/* /var/www/dashboard/