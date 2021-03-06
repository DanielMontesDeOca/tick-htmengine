FROM ubuntu:14.04

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    curl \
    wget \
    git-core \
    gcc \
    g++ \
    cmake \
    python \
    python2.7 \
    python2.7-dev \
    zlib1g-dev \
    bzip2 \
    libyaml-dev \
    libyaml-0-2 \
    libmysqlclient-dev \
    supervisor
RUN wget http://releases.numenta.org/pip/1ebd3cb7a5a3073058d0c9552ab074bd/get-pip.py -O - | python
RUN pip install --upgrade setuptools
RUN pip install wheel numpy pycapnp alembic gevent

# Use gcc to match nupic.core binary
ENV CC gcc
ENV CXX g++

# Set enviroment variables needed by NuPIC
#ENV NUPIC /usr/local/src/nupic
#ENV NTA_DATA_PATH /usr/local/src/nupic/prediction/data

# OPF needs this
ENV USER docker

# Clone numenta-apps
RUN git clone https://github.com/numenta/numenta-apps /usr/local/src/numenta-apps

# Set up nta.utils
WORKDIR /usr/local/src/numenta-apps/nta.utils
RUN python setup.py develop --user

# Set up htmengine
WORKDIR /usr/local/src/numenta-apps/htmengine
RUN python setup.py develop --user

# Copy context into container file system
ADD . $NUPIC

# Install MySQL client
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y mysql-client

COPY ./app/src/conf/rabbitmq.conf /usr/local/src/numenta-apps/nta.utils/conf/rabbitmq.conf

# Create a startup.sh bash script to start services
# COPY ../scripts/htmengine/startup.sh /home/docker/startup.sh
# RUN chmod +x /home/docker/startup.sh

EXPOSE 8080

ENTRYPOINT ["/home/docker/startup.sh"]
