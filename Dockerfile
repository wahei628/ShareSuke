ARG RUBY_VERSION=ruby:3.2.3
ARG NODE_VERSION=20

FROM $RUBY_VERSION
ARG RUBY_VERSION
ARG NODE_VERSION
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo
RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
&& wget --quiet -O - /tmp/pubkey.gpg https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
&& echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
&& apt-get update -qq \
&& apt-get install -y build-essential nodejs yarn
RUN mkdir /ShareSuke
WORKDIR /ShareSuke
RUN gem install bundler
COPY Gemfile /ShareSuke/Gemfile
COPY Gemfile.lock /ShareSuke/Gemfile.lock
COPY yarn.lock /ShareSuke/yarn.lock
RUN bundle install
RUN yarn install
COPY . /ShareSuke