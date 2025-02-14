TICKET-MANAGEMENT-SYSTEM

Proje Özeti\n
Ticket-Management-System, Jira API'si yardımıyla issue'ların takibini kolaylaştıran ve bu issue'ları veritabanında saklayan bir otomasyon sistemidir. Proje, ticket yönetimi süreçlerini daha verimli hale getirmek amacıyla geliştirilmiştir. NestJS, Prisma ORM, JWT, Docker, ve PostgreSQL teknolojilerini kullanarak inşa edilmiştir. Projede Postman ve Swagger ile test süreçleri yürütülmüş, anlık bildirimler için WebSocket teknolojisi entegre edilmiştir. Bu sayede yeni bir ticket oluşturulduğunda, ticket'ın atandığı kullanıcıya anlık bildirim gönderilir.

Docker kullanarak projeyi konteynerize ettik, böylece farklı ortamlarda çalıştırılması ve uzun vadeli ölçeklendirme işlemleri kolaylaştırılmıştır. PostgreSQL veritabanı da Docker üzerinde çalıştırılmaktadır.

KULLANILAN TEKNOLOJİLER

- NESTJS
- PRISMA ORM
- JWT
- WEBSOCKET
- DOCKER
- POSTGRESQL
- JIRA API

KURULUM VE ÇALIŞTIRMA

-Projeyi çalıştırmak ve test etmek için \n
 git clone https://github.com/batudez/ticket-management-system.git
-Jira hesabınız yoksa Jira hesabı oluşturunuz.\n
-Oluşturduğunuz bu hesap ile yeni bir proje oluşturunuz.\n
-Projemizde swagger üzerinden aynı project-key'e sahip bir proje oluşturunuz.\n
-Jira hesabınızdan yeni bir api Token oluşturunuz.\n
-Jira hesap bilgilerinizi environment dosyasında kolaylıkla güncelleyiniz.\n
-Gerekli docker kurulumlarını gerçekleştiriniz.\n
-Proje dizinine girip docker-compose.yml dosyasının var olduğunu doğruladıktan sonra,\n
 aşağıdaki komutla projeyi başlatabilirsiniz:\n

  --docker-compose up --build
