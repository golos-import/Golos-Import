************
Установка
************

Ручная установка:
--------------------

.. code-block:: sh

   git clone https://github.com/golos-import/Golos-Import
   cd Golos-Import
   cd GolosPosting
   pip install -r requirements.txt
   cd ..
   cd LiveJournal
   npm i
   cd ..
   cd WebClient
   npm i
   cd ..
   cd WebServer
   npm i

Запуск серверной части:
--------------------

.. code-block:: sh

   cd src
   node server.js

Открываем в браузере 127.0.0.1:3000

************
Замечание 1
************

Для корректной работы необходимо, чтобы в PATH был прописан путь к python

************
Замечание 2
************

На самом деле постинг идет в сеть Steem.