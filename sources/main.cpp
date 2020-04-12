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

using namespace std;

#define SERVER_PORT		"8000"
#define MAX_CONNECTION	1000

int		CreateSocker(const char* port);
void*	getClientAddr(struct sockaddr* sa);

void	HttpRequest(int);
void	ParseHttpRequest(const char*);

int		main() {
	int sock = CreateSocker(SERVER_PORT);

	if (sock < 0) {
		cerr << "Error create socket" << endl;
		return -1;
	}

	cout << "Server created!" << endl;
	
	struct sockaddr_storage client_addr;
	int client_id;

	while (true) {
		socklen_t s_size = sizeof(client_addr);
    	client_id = accept(sock, (struct sockaddr*)&client_addr, &s_size);

		if (client_id == -1) {
			cerr << "Error accepted" << endl;
			return -1;
		}

		char ip[INET6_ADDRSTRLEN];
		inet_ntop(client_addr.ss_family, getClientAddr((struct sockaddr *)&client_addr), ip, sizeof ip);
		cout << "Server: got connection from " << ip << endl;
	}

	return 0;
}

void*	getClientAddr(struct sockaddr* sa) {
	if (sa->sa_family == AF_INET) {
		return &(((struct sockaddr_in*)sa)->sin_addr);
	}
	return &(((struct sockaddr_in6*)sa)->sin6_addr);
}

int		CreateSocker(const char* port) {
	struct addrinfo		hints;
	struct addrinfo*	serverinfo;
	struct addrinfo*	p;

	memset(&hints, 0, sizeof(hints)); //maybe use fill

	hints.ai_family = AF_UNSPEC;
	hints.ai_socktype = SOCK_STREAM;
	hints.ai_flags = AI_PASSIVE;

	int res = getaddrinfo(nullptr, port, &hints, &serverinfo);
	if (res != 0) {
		cerr << "Error getaddrinfo()" << endl;
		return -1;
	}

	int sock;
	int yes;
	for (p = serverinfo; p != nullptr; p = p->ai_next) {
		
		sock = socket(p->ai_family, p->ai_socktype, p->ai_protocol);
		if (sock == -1) {
			continue;
		}
		
		if (setsockopt(sock, SOL_SOCKET,
				SO_REUSEADDR, &yes, sizeof(int)) == -1)
		{
			cerr << "Error setsockopt()" << endl;
			// close(sock); //???
			freeaddrinfo(serverinfo);
			return -2;
		}

		if (bind(sock, p->ai_addr, p->ai_addrlen) == -1) {
			// close(sock);
			continue;
		}
		break;
	}

	freeaddrinfo(serverinfo);

	if (p == nullptr) {
		cerr << "Failed find address" << endl;
		return -3;
	}

	if (listen(sock, MAX_CONNECTION) == -1) {
		cerr << "Error listen" << endl;
		return -4;
	}

	return sock;
}