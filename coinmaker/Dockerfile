FROM python:3.9

ADD index.py .

COPY stockholm.geojson .

RUN pip install numpy
RUN pip install geojson
RUN pip install shapely
RUN pip install pymongo

CMD [ "python", "./index.py" ]