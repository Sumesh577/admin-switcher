
var generator = document.getElementsByName('generator');
var appendText = "/language/en-GB/en-GB.xml";
var _loadDoc; 
if(generator.length != 0){
    var content = generator[0].getAttribute('content');
    var links = document.getElementsByTagName('a');
    var _Isadminitrator =false;
    var _cms = content.split(" ")[0];
    if(_cms == "Joomla!"  && _Isadminitrator == false){
        loadDoc();
        setTimeout(function(){
            //code to send message to open notification.
            chrome.runtime.sendMessage({type: "notification" , version: _loadDoc, options: { 
                type: "basic", 
                iconUrl: "logo.png",
                title: window.location.origin,
                message: "Joomla "+_loadDoc
            }});
        },1000);

        // Loop all the <a> tag then pass to the IsAdministrator function to check 
        for(var i = 0; i< links.length; i++){
            if(IsAdministrator(links[i].href)){
                _Isadminitrator = true;
            }
        }

        /* Function run when clicked on browser Action Gotmessgae is callback function*/
        chrome.runtime.onMessage.addListener(Gotmessgae);


        // Callback Function when recive the message from the background script then perform the task
        function Gotmessgae(messgae,sender,SendResponse){
            if(_cms == "Joomla!"  && _Isadminitrator == false){
                window.open(window.location.origin+"/administrator");
            }else if(_cms == "Joomla!" && _Isadminitrator == true){
                window.open(window.location.origin);
            }
        }


        //Function check current page is IsAdministrator for joomla 
        //Params Sting|str
        function IsAdministrator(str){
            var  admin = str.split("/");
            for(var i = 0; i< admin.length; i++){
            //console.log(admin[i]);
                if(admin[i] == "administrator"){
                    return true;
                    break;
                }

            }   
        }
        
        function loadDoc() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var xmlDoc = this.responseXML;
                var version = xmlDoc.getElementsByTagName("version")[0].childNodes[0].nodeValue;
                _loadDoc =   version;
            }
            };
            xhttp.open("GET", window.location.origin+appendText, true);
            xhttp.send();
        }
    }else if(_cms == "WordPress"){
        _version  = content.split(" ")[1];
        //code to send message to open notification.
        chrome.runtime.sendMessage({type: "wordpress" , version: _version, options: { 
            type: "basic", 
            iconUrl: "logo.png",
            title: window.location.origin,
            message: "Wordpress "+_version
        }});

        /* Function run when clicked on browser Action Gotmessgae is callback function*/
        chrome.runtime.onMessage.addListener(Gotmessgae);


        // Callback Function when recive the message from the background script then perform the task
        function Gotmessgae(messgae,sender,SendResponse){
            if(_cms == "WordPress"  && _Isadminitrator == false){
                window.open(window.location.origin+"/wp-admin");
            }else if(_cms == "WordPress" && _Isadminitrator == true){
                window.open(window.location.origin);
            }
        }

        // Loop all the <a> tag then pass to the IsAdministrator function to check 
        for(var i = 0; i< links.length; i++){
            if(IsWpAdmin(links[i].href)){
                _Isadminitrator = true;
            }
        }

        // Function check current page is IsWpadmin for joomla 
        // Params Sting|str
        function IsWpAdmin(str){
           var  admin = str.split("/");
           for(var i = 0; i< admin.length; i++){
             //console.log(admin[i]);
               if(admin[i] == "wp-admin"){
                   return true;
                   break;
               }
        
           }
        }
        
    }
}
