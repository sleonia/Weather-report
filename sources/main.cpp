#include "server.hpp"

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

		HttpRequest(client_id);
		close(client_id);
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

		if (::bind(sock, p->ai_addr, p->ai_addrlen) == -1) {
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

void	HttpRequest(int aSock) {
	const int	request_buf_size = 65536;
	char		request[request_buf_size];

	int bytes_recvd = recv(aSock, request, request_buf_size - 1, 0);

	if (bytes_recvd < 0) {
		cerr << "Error recv" << endl;
		return ;
	}
	request[bytes_recvd] = '\0';

	cout << "Request:" << endl << request << endl;

	sHTTPHeader req;

	ParseHttpRequest(request, &req);

	if (req.type == eHTTP_GET) {
		SendMessage(aSock, "<p><a href=\"lorem.html\"><img src=\"image.png\"></a>Lorem ipsum dolor sit amet...</p>");
		// SendMessage(aSock, "sensor 1: 10<br> sensor 2: 20<br><a href=\"http://cppprosto.blogspot.com/2017/09/blog-post_23.html\">external</a><br><a href=\"internal\">internal</a>");
	} else {
		Send404(aSock);
	}
}

void ParseHttpRequest(const char* apstrRequest, sHTTPHeader* apHeader)
{
  int  type_length = 0;
  char type[255]   = {0};
  int  index = 0;

  apHeader->type = eHTTP_UNKNOWN;

  sscanf(&apstrRequest[index], "%s", type);
  type_length = strlen(type);

  if(type_length == 3)
  {
    if(type[0] == 'G' && type[1] == 'E' && type[2] == 'T')
      apHeader->type = eHTTP_GET;

    index += type_length + 1;
    sscanf(&apstrRequest[index], "%s", apHeader->path);
  }
}

void	SendMessage(int aSock, const char *apStrMessage)
{
	char buffer[65536] = {0};

	strcat(buffer, "HTTP/1.1 200 OK\n\n");
	strcat(buffer, "<h1>");
	strcat(buffer, apStrMessage);
	strcat(buffer, "</h1>");

	int len = strlen(buffer);
	send(aSock, buffer, len, 0);
}

void	Send404(int aSock) {
	const char* buffer = "HTTP/1.1 404 \n\n";
	int			len = strlen(buffer);
	send(aSock, buffer, len, 0);
}

// server: got connection from 127.0.0.1
// request:
// GET /index.html HTTP/1.1
// Host: localhost:3490
// Connection: keep-alive
// Upgrade-Insecure-Requests: 1
// User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/68.0.3440.75 Chrome/68.0.3440.75 Safari/537.36
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
// Accept-Encoding: gzip, deflate, br
// Accept-Language: en-US,en;q=0.9,ru;q=0.8

