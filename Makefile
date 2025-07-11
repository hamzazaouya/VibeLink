NAME	= Matcha

all	: $(NAME)

RED = \033[0;31m
GREEN = \033[0;32m
BLUE = \033[0;34m
RESET = \033[0m

$(NAME)	:
	@echo "$(BLUE)██████████████████████ Building Images ███████████████████████$(RESET)"
	@docker-compose up --build -d


up	:
	@echo "$(GREEN)██████████████████████ Running Containers ██████████████████████$(RESET)"
	@docker-compose up --build

down   :
	@echo "$(RED)████████████████████ Stoping Containers █████████████████████$(RESET)"
	# @docker-compose -f ./docker-compose.yml --env-file backend/.env down

logs:
	@echo "$(GREEN)██████████████████████ Running Containers ██████████████████████$(RESET)"
	docker compose logs

clean	:
	@echo "$(RED)████████████████████ Cleaning Containers █████████████████████$(RESET)"
	docker-compose -f ./docker-compose.yml down -v --rmi all --remove-orphans

fclean	: clean down
	@echo "$(RED)█████████████████████ Remove Everything ██████████████████████$(RESET)"
	docker system prune --volumes --all --force
	docker network prune --force
	docker volume prune --force
	rm -rf ./backend/node_modules
	rm -rf ./frontend/node_modules

re	: fclean all

images :
	docker images

ps	:
	@echo "$(RED)████████████████████ Daemon Containers █████████████████████$(RESET)"
	docker-compose -f ./docker-compose.yml ps

ls :
	@echo "$(RED)████████████████████ Listing Containers █████████████████████$(RESET)"
	docker-compose ls

backend :
	@echo "$(RED)████████████████████ Backend Container █████████████████████$(RESET)"

	docker exec -it backend bash

frontend :
	@echo "$(RED)████████████████████ Frontend Container █████████████████████$(RESET)"

	docker exec -it frontend bash

postgres :
	@echo "$(RED)████████████████████ Postgres Container █████████████████████$(RESET)"
	docker exec -it postgres psql

.PHONY : all down clean fclean re ls ps frontend backend postgres images