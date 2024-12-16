.DEFAULT_GOAL := help
SHELL := /bin/bash
UNAME_S := $(shell uname -s)
SEMVER3 := $(shell cat .version)


ifndef ENV_FILE
ENV_FILE := .env
export ENV_FILE
endif

ifndef DEVENV_FILE
DEVENV_FILE := .env.devenv
export DEVENV_FILE
endif

test:
	mvn test


