#pragma once

#include <iostream>
#include <string>
#include <cstring>
#include <string.h>
#include <sys/socket.h>
#include <memory>
#include <stdio.h>
#include <netdb.h>
#include <time.h>
#include <errno.h>
#include <arpa/inet.h>
#include <stdio.h>
#include <unistd.h>

using namespace std;

#define SERVER_PORT		"8000"
#define MAX_CONNECTION	1000

enum eHTTPMethod {
	eHTTP_UNKNOWN = 0,
	eHTTP_CONNECT,
	eHTTP_DELETE,
	eHTTP_GET,
	eHTTP_HEAD,
	eHTTP_OPTIONS,
	eHTTP_PATCH,
	eHTTP_POST,
	eHTTP_PUT,
	eHTTP_TRACE
};

struct	sHTTPHeader {
	eHTTPMethod	type;
	char		path[255]; //string?
};

int		CreateSocker(const char*);
void*	getClientAddr(struct sockaddr*);

void	HttpRequest(int);
void	ParseHttpRequest(const char*, sHTTPHeader*);
void	SendMessage(int, const char*);
void	Send404(int);
