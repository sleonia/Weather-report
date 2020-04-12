.PHONY: all, $(NAME), norm, clean, fclean, re

NAME = server

SRC_PATH = ./sources/
# INC_PATH = ./includes/
OBJ_PATH = ./objects/

SRC = $(addprefix $(SRC_PATH), $(SRC_NAME))
OBJ = $(addprefix $(OBJ_PATH), $(OBJ_NAME))

SRC_NAME = main.cpp
OBJ_NAME = $(SRC_NAME:.cpp=.o)

FLAGS = -std=c++11 -Wall -Werror -Wextra

all: $(NAME)

$(NAME): $(OBJ)
	@g++ -o $(NAME) $(OBJ)
	# @gcc -o $(NAME) $(OBJ) -lm -L $(LIB_PATH) -lft

$(OBJ_PATH)%.o: $(SRC_PATH)%.cpp
	@mkdir -p $(OBJ_PATH)
	@g++ $(FLAGS) -o $@ -c $<
	# @gcc -Wall -Werror -Wextra $(INC) -o $@ -c $<