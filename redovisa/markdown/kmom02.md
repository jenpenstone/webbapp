Kmom02
-------

__Vilka fördelar ser du med verktyg som Postman, curl och jq?__

Det jag ser som en fördel med att använda såna här verktyg är att det är lättare att förstå vad som sker. T.ex. i Postman så blir det mer visuellt och enklare när man kan kontrollera att man får ut rätt saker avskilt från all annan kod. Likadant med jq som gör det lätt testa sig fram tills man får rätt resultat. Jag tycker det är mycket enklare och lättare att förstå än att skriva i terminalen.

__Fick du till en bra struktur i din CSS/SASS kod?__

Jag tycker att jag har fått till en bra början till struktur för min CSS/SASS kod. Jag utgick från min tidigare kod och såg över vad den bestod av och hur jag kunde dela upp i olika filer utifrån funktionalitet. Sen skapade jag en ny fil för alla variabler och lyfte ut färg och font till variabler för att lättare kunna återanvända dem. För att göra det lätt att byta färgschema så valde jag att namnge gärgerna utifrån funtion och inte nyans. Jag kommer troligen behöva utöka och justera filerna efterhand som appen utvecklas men just nu känns det som en bra struktur. 


__Vilka fördelar ser du med verktyg som webpack och SASS?__

Den stora fördelen ser jag i att man minskar beroenden och behov av att gå in och justera detaljer på så många ställen när något ändras. Som jag nämnde ovan så möjliggör ju variabler att man enkelt kan ändra färgtema helt och hållet på ett väldigt enkelt sätt direkt i variabel-filen. Man behöver ju inte heller hålla koll på och se till att man lägger till alla js filer som script utan det sköter webbpack. Dessa verktyg gör helt enkelt att det blir enklare och smidigare att koda och när det är dags att gå från utveckling till produktion så blir det inte en stor avancerad process med att ändra beroenden och inställningar.


__Valda du flat design eller ej för dina knappar? Varför?__

Jag testade först med att ändra om från flat design till liknande som visades i artikeln. Men det förstörde det stilrena i designen att ha väldigt tydliga knappar som poppade ut från bakgrunden. Men helt flat design tyckte jag var lite trist och gjorde det svårt för användaren att uppfatta var den ska klicka. Så jag gjorde en diskret variant där knapparna och nav-baren blev lite levande med olika toner men utan att förstöra appens stil. Användaren ser nu tydligt var det går att klicka.

__Vilken är din TIL för detta kmom?__

Mitt TIL för detta kmom är att jag lärt mig göra ett PUT-request. Jag tyckte detta var väldigt klurigt och hade gärna sett mer hjälp på hur man går tillväga.
