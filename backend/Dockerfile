FROM python:3.9-slim

#PYTHONUNBUFFERED=1

RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		postgresql-client \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip --no-cache-dir install -r requirements.txt

COPY . /app/

EXPOSE 8000
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
RUN chmod +x start_migration.sh
ENTRYPOINT [ "./start_migration.sh" ]