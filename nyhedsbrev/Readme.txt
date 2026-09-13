HTMLMAIL v.1.0
DL Fra www.phpuniverset.dk

En lille beskrivelse af de forskellige filer.

class_html_mime_mail.inc
- Htmlmail class

nyhedsbrev.html
- Den fil hvor du laver din HTML opsætning

nyhedsbrev.txt
- Den fil hvor du laver din tekst version af din news mail.

pilhoj.gif
- Kan buges i din html opsætning

sendmail.php
- den fil skal du bruge når du skal sende din HTML mail.

mailliste.php
- Tilmeld / afmeld nyhedsmail

mysqldb_dump.sql
- Tabellen hvor alle dine mails bliver lagt.


1. Rediger
mailliste.php & sendmail.php så der står de rigtige mail oplysnigner og mysql oplysninger.

2. opret din mailliste tabel i mysqll DB'en 

3. upload mailliste.php så dine brugere kan begynde og tilmelde sig din nyhedsmail.

4. rediger din nyhedsbrev.html + txt så der står den info du vil sende ud.

5. upload 
nyhedsbrev.txt
nyhedsbrev.html
pilhoj.gif
sendmail.php
class_html_mime_mail.inc

til den samme folder og ligge en htacces op til at beskydte folderen.
læs mere om htaccess her: http://www.phpuniverset.dk/se_child_forum.phtml?forum_id=1&id=263