#include <SoftwareSerial.h>      // Библиотека для работы с GSM
#include <EncButton.h>           // Кнопка
#include <String.h>
SoftwareSerial SIM800(8,9);      // Создать объкт, пины - RXD, TXD 


// Выберите APN оператора
#define APN "AT+CSTT=\"internet\""                                        // Мегафон
//#define APN "AT+CSTT=\"internet.beeline.ru\",\"beeline\",\"beeline\""   // Билайн
//#define APN "AT+CSTT=\"internet.mts.ru\",\"mts\",\"mts\""               // МТС
//#define APN "AT+CSTT=\"internet.tele2.ru\""                             // Tele2
// период переключения, в нашем случае раз в час, но с учетом времени на подключение
#define T_PERIOD 3534000 

// Ссылка для подключения к серверу, необходимо скопировать и вставить свой
String url = "GET http://cf83662.tw1.ru/";        
int32_t value1, value2, value3;      // 3 переменных(типа большое число) отправляемых на сервер
uint32_t timer = -3534000;   // переменная таймера, значение отриц. чтобы таймер сработал в самом начале


Button MyButt(7, INPUT_PULLUP);   //Создаем кнопку


void ShowSerialData()   //Функия для чтния ответа из модуля
{
  //Пока есть данные - читать их
  while(SIM800.available()!=0) Serial.write(SIM800.read());
  delay(5000); 
  
}


void connectToNetwork(){   // Функция подключения модуля к сети
  //Проверка состояния SIM-карты. Если модуль готов к работе, он должен ответить READY
   SIM800.println("AT");
   delay(1000);
  // Задаем скорость обмена данных
   SIM800.println("AT+CPIN?");
   delay(1000);
  // Проверка регистрации в сети. Если модуль зарегистрирован в сети, он должен ответить 1.
   SIM800.println("AT+CREG?");
   delay(1000);
  // Активация GPRS. Если GPRS активирован, он должен ответить 1.
   SIM800.println("AT+CGATT?");
   delay(1000);
  // Закрыть все открытые соедидения, и быть готовым к новому
   SIM800.println("AT+CIPSHUT");
   delay(1000); 
   SIM800.println("AT+CIPSTATUS");
   delay(2000);
  // Закрыть все открытые соедидения, и быть готовым к новому
   SIM800.println("AT+CIPMUX=0");
   delay(2000);
   ShowSerialData();
  // Подключение к мобильной сети оператора 
   SIM800.println(APN);
   delay(1000);
   ShowSerialData();
  // Активировать беспроводной обмен данных в сети
   SIM800.println("AT+CIICR");
   delay(3000);
   ShowSerialData();
  //Получение IP-адреса. Модуль должен вернуть свой IP-адрес.
   SIM800.println("AT+CIFSR");
   delay(2000);
   ShowSerialData();
   SIM800.println("AT+CIPSPRT=0");
   delay(3000);
   ShowSerialData();
  //Подключение к серверу
   SIM800.println("AT+CIPSTART=\"TCP\",\"cf83662.tw1.ru\",\"80\"");//start up the connection
   delay(6000);
   ShowSerialData();
  //Отпарвить контрольный пакет данных
   SIM800.println("AT+CIPSEND");
   delay(4000);
   ShowSerialData();
}


void sendData()  // Функция по отправке данных в сервер
{
  // Добавляем в отправляемый заголовок файла наши 3 значения
  SIM800.println(url); // Отправляем данные в сервер
  SIM800.println((char)26); // Управляющий символ который отправляет данные
  delay(5000); 
  ShowSerialData();
  SIM800.println();
}


void setup()
{
  String resp = "";                         // Получение ответа
  Serial.begin(9600);                       // Скорость обмена данными с компьютером
  SIM800.begin(9600);                       // Скорость обмена данными с модемом
  SIM800.println("AT");
  connectToNetwork();
  delay(1000);
  sendData();
  
}
 
void loop()
{
//  if (millis() - timer >= T_PERIOD) { // таймер на millis()
//    timer = millis();   //Сбрасываем таймер
//    //Подключаемся к серверу - время подключения примерно 2 мин
//    connectToNetwork(urlWithToken);
//    
//    //Записываем в переменные нужную нам информацию
//    value1 = 5.5; 
//    value2 = 12; 
//    value3 = 3.3;
//    
//    sendData(value1, value2, value3);  //Отправляем собранную информацию на сервер
//    SIM800.println("AT+CIPSHUT");// Разрываем соединение
//    delay(100);
//    ShowSerialData();
//  }
//
//  if (MyButt.press()) {  // Если нажата кнпока
//    //Подключаемся к серверу - время подключения примерно 2 мин
//    connectToNetwork(urlWithToken);
//
//    String error = "Строка ошибки";  // Формируем текст ошибку
//    String url = urlWithToken + "&status=" + error;   // Формируем запрос
//    SIM800.println(url); // Отправляем данные в сервер
//    SIM800.println((char)26); // Управляющий символ который отправляет данные
//    delay(5000); 
//    SIM800.println();
//    SIM800.println("AT+CIPSHUT");// Разрываем соединение
//    delay(100);
//    ShowSerialData();
//  }
} 
