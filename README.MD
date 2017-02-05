#Установка

Существуют python-библиотеки для работы с блокчейном Голоса (conservatorio) и Steem (piston).
Из-за незавершенности разработки conservatorio, он не опубликован в репозитории pip и конфликтует с piston.
Поэтому одновременно установить 2 эти библиотеки для одной установки python не получится.
Аналогично - для используемых conservatorio/piston библиотек python-goloslib и python-steemlib
(в библиотеке pip они конфликтуют за имя steem)

##Ручная установка (для постинга в Steem):

```
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
```

##Ручная установка (для постинга в Голос):

```
   git clone https://github.com/GolosChain/python-graphenelib
   cd python-graphenelib
   python setup.py install --user
   cd..
   git clone https://github.com/GolosChain/python-goloslib
   cd python-goloslib
   python setup.py install --user
   cd..
   git clone https://github.com/GolosChain/conservatorio
   cd conservatorio
   python setup.py install --user
   cd ..
   pip install transliterate==1.8.1
   git clone https://github.com/golos-import/Golos-Import
   cd Golos-Import
   cd LiveJournal
   npm i
   cd ..
   cd WebClient
   npm i
   cd ..
   cd WebServer
   npm i
```

##Запуск серверной части:

```
   cd src
   node server.js
```

Открываем в браузере 127.0.0.1:3000

##Замечание 1

Для корректной работы необходимо, чтобы в PATH был прописан путь к python (версии 3)

##Замечание 2
Библиотеки conservatorio и python-goloslib требуют ряда доработок напильником для корректной работы