all: build run shell

build:
	@docker build --tag=sergioalonso/resume .

run:
	@docker run --name resume -itd -p 3000:80 sergioalonso/resume

shell:
	@docker exec -it resume /bin/bash

clean:
	@docker stop resume
	@docker rm resume
	@rm -fr resume.tar

deploy:
	@docker save -o resume.tar sergioalonso/resume
	@rsync -avh resume.tar xana:~/
	@ssh xana docker stop resume
	@ssh xana docker rm resume
	@ssh xana docker load -i resume.tar
	@ssh xana docker run --name resume --restart=always -d -e "VIRTUAL_HOST=www.sergioalonso.es" -t -p 3000:3000 sergioalonso/resume
