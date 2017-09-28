
export function uni2cript(str){

//Get the first 2 chars for special replacement
var two = str.substring(0, 2);
var newtwo = two;

//First char twos
newtwo = newtwo.replace('சா', 'saa');
newtwo = newtwo.replace('சீ', 'see');
newtwo = newtwo.replace('சூ', 'soo');
newtwo = newtwo.replace('சே', 'sea');
newtwo = newtwo.replace('சை', 'sai');
newtwo = newtwo.replace('சோ', 'soa');
newtwo = newtwo.replace('சௌ', 'sau');
newtwo = newtwo.replace('சி', 'si');
newtwo = newtwo.replace('சு', 'su');
newtwo = newtwo.replace('செ', 'se');
newtwo = newtwo.replace('சொ', 'so');

str = str.replace(two, newtwo);


//Get the first char for special replacement
var one = str.substring(0, 1);
var newone = one;

//First char one
newone = newone.replace('ச', 'sa');

str = str.replace(one, newone);



//Fours

str = str.replace(/க்ஷி/g, 'kshi');
str = str.replace(/க்ஷை/g, 'kshai');
str = str.replace(/க்ஷே/g, 'kshea');
str = str.replace(/க்ஷா/g, 'kshaa');
str = str.replace(/க்ஷு/g, 'kshu');
str = str.replace(/க்ஷொ/g, 'ksho');
str = str.replace(/க்ஷூ/g, 'kshoo');
str = str.replace(/க்ஷோ/g, 'kshoa');
str = str.replace(/ஸ்ரீ/g, 'sree');
str = str.replace(/க்ஷீ/g, 'kshee');
str = str.replace(/க்ஷ்/g, 'ksh');
str = str.replace(/க்ஷௌ/g, 'kshau');
str = str.replace(/க்ஷெ/g, 'kshe'); 

str = str.replace('ச்ச', 'cha');
str = str.replace('ச்சா', 'chaa');
str = str.replace('ச்சீ', 'chee');
str = str.replace('ச்சூ', 'choo');
str = str.replace('ச்சே', 'chea');
str = str.replace('ச்சை', 'chai');
str = str.replace('ச்சோ', 'choa');
str = str.replace('ச்சௌ', 'chau');
str = str.replace('ச்சி', 'chi');
str = str.replace('ச்சு', 'chu');
str = str.replace('ச்செ', 'che');
str = str.replace('ச்சொ', 'cho');


//Logic fours

str = str.replace('ஞ்ச்', 'gnch');
str = str.replace('ஞ்ச', 'gncha');
str = str.replace('ஞ்சா', 'gnchaa');
str = str.replace('ஞ்சீ', 'gnchee');
str = str.replace('ஞ்சூ', 'gnchoo');
str = str.replace('ஞ்சே', 'gnchea');
str = str.replace('ஞ்சை', 'gnchai');
str = str.replace('ஞ்சோ', 'gnchoa');
str = str.replace('ஞ்சௌ', 'gnchau');
str = str.replace('ஞ்சி', 'gnchi');
str = str.replace('ஞ்சு', 'gnchu');
str = str.replace('ஞ்செ', 'gnche');
str = str.replace('ஞ்சொ', 'gncho');

str = str.replace(/ன்ரா/g, 'ntaa');
str = str.replace(/ன்ரி/g, 'nti');
str = str.replace(/ன்ரீ/g, 'ntee');
str = str.replace(/ன்ரு/g, 'ntu');
str = str.replace(/ன்ரூ/g, 'ntoo');
str = str.replace(/ன்ரெ/g, 'nte');
str = str.replace(/ன்ரே/g, 'ntea');
str = str.replace(/ன்ரை/g, 'ntai');
str = str.replace(/ன்ரொ/g, 'nto');
str = str.replace(/ன்ரோ/g, 'ntoa');
str = str.replace(/ன்ரௌ/g, 'ntau');

str = str.replace(/ற்றொ/, 'tto');
str = str.replace(/ற்றோ/, 'ttoa');
str = str.replace(/ற்றௌ/, 'ttau');



//Threes
str = str.replace(/க்ஷ/g, 'ksha');

str = str.replace(/( |\n)சா/g, '$1chaa');
str = str.replace(/( |\n)சீ/g, '$1chee');
str = str.replace(/( |\n)சூ/g, '$1choo');
str = str.replace(/( |\n)சே/g, '$1chea');
str = str.replace(/( |\n)சை/g, '$1chai');
str = str.replace(/( |\n)சோ/g, '$1choa');
str = str.replace(/( |\n)சௌ/g, '$1chau');
str = str.replace(/( |\n)சி/g, '$1chi');
str = str.replace(/( |\n)சு/g, '$1chu');
str = str.replace(/( |\n)செ/g, '$1che');
str = str.replace(/( |\n)சொ/g, '$1cho');

str = str.replace(/ன்ர/g, 'nta');

str = str.replace(/ற்ற்/, 'tt');
str = str.replace(/ற்றா/, 'ttaa');
str = str.replace(/ற்றி/, 'tti');
str = str.replace(/ற்றீ/, 'ttee');
str = str.replace(/ற்று/, 'ttu');
str = str.replace(/ற்றூ/, 'ttoo');
str = str.replace(/ற்றெ/, 'tte');
str = str.replace(/ற்றே/, 'ttea');
str = str.replace(/ற்றை/, 'ttai');


//Twos

str = str.replace(/ற்ற/, 'tta');
str = str.replace(/( |\n)ச/g, '$1cha');

str = str.replace(/கொ/g, 'ko');
str = str.replace(/ஜௌ/g, 'jau');
str = str.replace(/நூ/g, 'noo');
str = str.replace(/தி/g, 'thi');
str = str.replace(/ளை/g, 'lai');
str = str.replace(/னெ/g, 'ne');
str = str.replace(/ஸே/g, 'sea');
str = str.replace(/பூ/g, 'poo');
str = str.replace(/சீ/g, 'see');
str = str.replace(/டூ/g, 'doo');
str = str.replace(/ழூ/g, 'zhoo');
str = str.replace(/சை/g, 'sai');
str = str.replace(/ழ்/g, 'zh');
str = str.replace(/யி/g, 'yi');
str = str.replace(/பை/g, 'pai');
str = str.replace(/லீ/g, 'lee');
str = str.replace(/ணூ/g, 'noo');
str = str.replace(/ளோ/g, 'loa');
str = str.replace(/தோ/g, 'thoa');
str = str.replace(/தா/g, 'thaa');
str = str.replace(/த்/g, 'th');
str = str.replace(/றோ/g, 'roa');
str = str.replace(/யை/g, 'yai');
str = str.replace(/பு/g, 'pu');
str = str.replace(/ஸை/g, 'sai');
str = str.replace(/ழு/g, 'zhu');
str = str.replace(/னீ/g, 'nee');
str = str.replace(/ஹோ/g, 'hoa');
str = str.replace(/பி/g, 'pi');
str = str.replace(/ணே/g, 'nea');
str = str.replace(/ஙீ/g, 'ngee');
str = str.replace(/தெ/g, 'the');
str = str.replace(/ஸு/g, 'su');
str = str.replace(/ஞௌ/g, 'gnau');
str = str.replace(/ஸெ/g, 'se');
str = str.replace(/ரா/g, 'raa');
str = str.replace(/றே/g, 'rea');
str = str.replace(/ய்/g, 'y');
str = str.replace(/ஙோ/g, 'ngoa');
str = str.replace(/ணொ/g, 'no');
str = str.replace(/ளா/g, 'laa');
str = str.replace(/கா/g, 'kaa');
str = str.replace(/னே/g, 'nea');
str = str.replace(/னா/g, 'naa');
str = str.replace(/வெ/g, 've');
str = str.replace(/ழை/g, 'zhai');
str = str.replace(/வி/g, 'vi');
str = str.replace(/லௌ/g, 'lau');
str = str.replace(/ஷொ/g, 'sho');
str = str.replace(/ஹெ/g, 'he');
str = str.replace(/வூ/g, 'voo');
str = str.replace(/மெ/g, 'me');
str = str.replace(/னி/g, 'ni');
str = str.replace(/யூ/g, 'yoo');
str = str.replace(/றௌ/g, 'rau');
str = str.replace(/கி/g, 'ki');
str = str.replace(/ஙெ/g, 'nge');
str = str.replace(/ழீ/g, 'zhee');
str = str.replace(/ணி/g, 'ni');
str = str.replace(/ரை/g, 'rai');
str = str.replace(/றி/g, 'ri');
str = str.replace(/ங்/g, 'ng');
str = str.replace(/பௌ/g, 'pau');
str = str.replace(/ஷு/g, 'shu');
str = str.replace(/ஜி/g, 'ji');
str = str.replace(/தே/g, 'thea');
str = str.replace(/வோ/g, 'voa');
str = str.replace(/ஞீ/g, 'gnee');
str = str.replace(/வை/g, 'vai');
str = str.replace(/தௌ/g, 'thau');
str = str.replace(/மீ/g, 'mee');
str = str.replace(/ரூ/g, 'roo');
str = str.replace(/நெ/g, 'ne');
str = str.replace(/டீ/g, 'dee');
str = str.replace(/ஙி/g, 'ngi');
str = str.replace(/ழோ/g, 'zhoa');
str = str.replace(/ஜெ/g, 'je');
str = str.replace(/ணா/g, 'naa');
str = str.replace(/ழெ/g, 'zhe');
str = str.replace(/யு/g, 'yu');
str = str.replace(/மே/g, 'mea');
str = str.replace(/டு/g, 'du');
str = str.replace(/ழே/g, 'zhea');
str = str.replace(/டெ/g, 'de');
str = str.replace(/லா/g, 'laa');
str = str.replace(/ஸோ/g, 'soa');
str = str.replace(/லோ/g, 'loa');
str = str.replace(/ஷோ/g, 'shoa');
str = str.replace(/ர்/g, 'r');
str = str.replace(/ஹா/g, 'haa');
str = str.replace(/ஙொ/g, 'ngo');
str = str.replace(/நை/g, 'nai');
str = str.replace(/ஞி/g, 'gni');
str = str.replace(/போ/g, 'poa');
str = str.replace(/ஹ்/g, 'h');
str = str.replace(/ஞெ/g, 'gne');
str = str.replace(/யௌ/g, 'yau');
str = str.replace(/யெ/g, 'ye');
str = str.replace(/ட்/g, 'd');
str = str.replace(/ற்/g, 't');
str = str.replace(/ஷே/g, 'shea');
str = str.replace(/ரே/g, 'rea');
str = str.replace(/ளெ/g, 'le');
str = str.replace(/ளே/g, 'lea');
str = str.replace(/றீ/g, 'ree');
str = str.replace(/ஷூ/g, 'shoo');
str = str.replace(/ஜொ/g, 'jo');
str = str.replace(/கெ/g, 'ke');
str = str.replace(/லெ/g, 'le');
str = str.replace(/ந்/g, 'n');
str = str.replace(/மை/g, 'mai');
str = str.replace(/யா/g, 'yaa');
str = str.replace(/ணு/g, 'nu');
str = str.replace(/லை/g, 'lai');
str = str.replace(/ஸொ/g, 'so');
str = str.replace(/ஞொ/g, 'gno');
str = str.replace(/ஙே/g, 'ngea');
str = str.replace(/ரோ/g, 'roa');
str = str.replace(/மோ/g, 'moa');
str = str.replace(/னு/g, 'nu');
str = str.replace(/ஙு/g, 'ngu');
str = str.replace(/டொ/g, 'do');
str = str.replace(/தீ/g, 'thee');
str = str.replace(/னௌ/g, 'nau');
str = str.replace(/வ்/g, 'v');
str = str.replace(/ஷ்/g, 'sh');
str = str.replace(/ணௌ/g, 'nau');
str = str.replace(/மொ/g, 'mo');
str = str.replace(/ஙா/g, 'ngaa');
str = str.replace(/ஷெ/g, 'she');
str = str.replace(/னை/g, 'nai');
str = str.replace(/சௌ/g, 'sau');
str = str.replace(/ளூ/g, 'loo');
str = str.replace(/கூ/g, 'koo');
str = str.replace(/கு/g, 'ku');
str = str.replace(/ரெ/g, 're');
str = str.replace(/ஷா/g, 'shaa');
str = str.replace(/ஸூ/g, 'soo');
str = str.replace(/மௌ/g, 'mau');
str = str.replace(/யொ/g, 'yo');
str = str.replace(/ளீ/g, 'lee');
str = str.replace(/கோ/g, 'koa');
str = str.replace(/ழொ/g, 'zho');
str = str.replace(/ஷி/g, 'shi');
str = str.replace(/ப்/g, 'p');
str = str.replace(/ஷீ/g, 'shee');
str = str.replace(/மி/g, 'mi');
str = str.replace(/ஞு/g, 'gnu');
str = str.replace(/லு/g, 'lu');
str = str.replace(/க்/g, 'k');
str = str.replace(/ஹை/g, 'hai');
str = str.replace(/நு/g, 'nu');
str = str.replace(/ஹி/g, 'hi');
str = str.replace(/சூ/g, 'soo');
str = str.replace(/ஹௌ/g, 'hau');
str = str.replace(/ஹொ/g, 'ho');
str = str.replace(/ஜோ/g, 'joa');
str = str.replace(/ல்/g, 'l');
str = str.replace(/ஜை/g, 'jai');
str = str.replace(/து/g, 'thu');
str = str.replace(/ம்/g, 'm');
str = str.replace(/ளௌ/g, 'lau');
str = str.replace(/ணீ/g, 'nee');
str = str.replace(/பீ/g, 'pee');
str = str.replace(/சா/g, 'saa');
str = str.replace(/ஜு/g, 'ju');
str = str.replace(/நி/g, 'ni');
str = str.replace(/யோ/g, 'yoa');
str = str.replace(/ஷை/g, 'shai');
str = str.replace(/பே/g, 'pea');
str = str.replace(/ணோ/g, 'noa');
str = str.replace(/ஞூ/g, 'gnoo');
str = str.replace(/நா/g, 'naa');
str = str.replace(/றை/g, 'rai');
str = str.replace(/ரௌ/g, 'rau');
str = str.replace(/ரு/g, 'ru');
str = str.replace(/ஜா/g, 'jaa');
str = str.replace(/ஸி/g, 'si');
str = str.replace(/ளொ/g, 'lo');
str = str.replace(/ஸா/g, 'saa');
str = str.replace(/வௌ/g, 'vau');
str = str.replace(/லி/g, 'li');
str = str.replace(/ஞை/g, 'gnai');
str = str.replace(/கௌ/g, 'kau');
str = str.replace(/சே/g, 'sea');
str = str.replace(/ஜே/g, 'jea');
str = str.replace(/ள்/g, 'l');
str = str.replace(/ஞோ/g, 'gnoa');
str = str.replace(/தொ/g, 'tho');
str = str.replace(/ஷௌ/g, 'shau');
str = str.replace(/மு/g, 'mu');
str = str.replace(/சி/g, 'si');
str = str.replace(/நீ/g, 'nee');
str = str.replace(/ஞே/g, 'gnea');
str = str.replace(/ரி/g, 'ri');
str = str.replace(/பொ/g, 'po');
str = str.replace(/பா/g, 'paa');
str = str.replace(/டௌ/g, 'dau');
str = str.replace(/டோ/g, 'doa');
str = str.replace(/று/g, 'ru');
str = str.replace(/ரொ/g, 'ro');
str = str.replace(/ஹு/g, 'hu');
str = str.replace(/ண்/g, 'n');
str = str.replace(/நௌ/g, 'nau');
str = str.replace(/ஜ்/g, 'j');
str = str.replace(/ளு/g, 'lu');
str = str.replace(/ச்/g, 'ch');
str = str.replace(/லூ/g, 'loo');
str = str.replace(/ரீ/g, 'ree');
str = str.replace(/கை/g, 'kai');
str = str.replace(/நோ/g, 'noa');
str = str.replace(/யீ/g, 'yee');
str = str.replace(/னூ/g, 'noo');
str = str.replace(/ஸ்/g, 's');
str = str.replace(/ளி/g, 'li');
str = str.replace(/வே/g, 'vea');
str = str.replace(/ணை/g, 'nai');
str = str.replace(/தை/g, 'thai');
str = str.replace(/டே/g, 'dea');
str = str.replace(/ஹீ/g, 'hee');
str = str.replace(/யே/g, 'yea');
str = str.replace(/சோ/g, 'soa');
str = str.replace(/ழி/g, 'zhi');
str = str.replace(/லொ/g, 'lo');
str = str.replace(/ஞா/g, 'gnaa');
str = str.replace(/ன்/g, 'n');
str = str.replace(/ஙூ/g, 'ngoo');
str = str.replace(/வு/g, 'vu');
str = str.replace(/ஙை/g, 'ngai');
str = str.replace(/ஹூ/g, 'hoo');
str = str.replace(/மூ/g, 'moo');
str = str.replace(/செ/g, 'se');
str = str.replace(/பெ/g, 'pe');
str = str.replace(/ஞ்/g, 'gn');
str = str.replace(/நே/g, 'nea');
str = str.replace(/ஸீ/g, 'see');
str = str.replace(/சு/g, 'su');
str = str.replace(/ழா/g, 'zhaa');
str = str.replace(/லே/g, 'lea');
str = str.replace(/டி/g, 'di');
str = str.replace(/தூ/g, 'thoo');
str = str.replace(/வீ/g, 'vee');
str = str.replace(/றா/g, 'raa');
str = str.replace(/வா/g, 'vaa');
str = str.replace(/ஸௌ/g, 'sau');
str = str.replace(/சொ/g, 'so');
str = str.replace(/ஜூ/g, 'joo');
str = str.replace(/ஙௌ/g, 'ngau');
str = str.replace(/மா/g, 'maa');
str = str.replace(/டா/g, 'daa');
str = str.replace(/ணெ/g, 'ne');
str = str.replace(/றொ/g, 'ro');
str = str.replace(/றூ/g, 'roo');
str = str.replace(/வொ/g, 'vo');
str = str.replace(/னோ/g, 'noa');
str = str.replace(/ழௌ/g, 'zhau');
str = str.replace(/றெ/g, 're');
str = str.replace(/கீ/g, 'kee');
str = str.replace(/ஹே/g, 'hea');
str = str.replace(/டை/g, 'dai');
str = str.replace(/ஜீ/g, 'jee');
str = str.replace(/கே/g, 'kea');
str = str.replace(/நொ/g, 'no');
str = str.replace(/னொ/g, 'no'); 




//Ones
str = str.replace(/ஏ/g, 'ea');
str = str.replace(/ஷ/g, 'sha');
str = str.replace(/ல/g, 'la');
str = str.replace(/ட/g, 'da');
str = str.replace(/ன/g, 'na');
str = str.replace(/ள/g, 'la');
str = str.replace(/உ/g, 'u');
str = str.replace(/ர/g, 'ra');
str = str.replace(/த/g, 'tha');
str = str.replace(/ஹ/g, 'ha');
str = str.replace(/ய/g, 'ya');
str = str.replace(/ற/g, 'ra');
str = str.replace(/எ/g, 'e');
str = str.replace(/இ/g, 'i');
str = str.replace(/வ/g, 'va');
str = str.replace(/ஞ/g, 'gna');
str = str.replace(/ந/g, 'na');
str = str.replace(/ஔ/g, 'au');
str = str.replace(/ம/g, 'ma');
str = str.replace(/ஓ/g, 'oa');
str = str.replace(/ஊ/g, 'oo');
str = str.replace(/ண/g, 'na');
str = str.replace(/ஆ/g, 'aa');
str = str.replace(/ழ/g, 'zha');
str = str.replace(/ஐ/g, 'ai');
str = str.replace(/ஜ/g, 'ja');
str = str.replace(/ஈ/g, 'ee');
str = str.replace(/க/g, 'ka');
str = str.replace(/ச/g, 'sa');
str = str.replace(/ஸ/g, 'sa');
str = str.replace(/ஃ/g, ':h');
str = str.replace(/ஒ/g, 'o');
str = str.replace(/ப/g, 'pa');
str = str.replace(/அ/g, 'a');
str = str.replace(/ங/g, 'nga');
str = str.replace(/,/g, ','); 



return str;

}
