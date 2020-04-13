.PHONY: all, $(NAME), norm, clean, fclean, re

NAME = server

INC_PATH = ./includes/
SRC_PATH = ./sources/
OBJ_PATH = ./objects/

INC = $(addprefix -I, $(INC_PATH))
SRC = $(addprefix $(SRC_PATH), $(SRC_NAME))
OBJ = $(addprefix $(OBJ_PATH), $(OBJ_NAME))
HEADERS = $(addprefix, $(INC_PATH), $(HEADERS_NAME))

HEADERS_NAME =	server.hpp

SRC_NAME = main.cpp
OBJ_NAME = $(SRC_NAME:.cpp=.o)

# FLAGS = -std=c++11
FLAGS = -std=c++11 -Wall -Werror -Wextra

all: $(NAME)

$(NAME): $(OBJ)
	@g++ -o $(NAME) $(OBJ)

$(OBJ_PATH)%.o: $(SRC_PATH)%.cpp $(HEADERS)
	@mkdir -p $(OBJ_PATH)
	@g++ $(FLAGS) $(INC) -o $@ -c $<

clean:
	@rm -rf $(OBJ_PATH)

fclean: clean
	@rm -f $(NAME)

re: fclean all