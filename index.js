var Promise = require('bluebird');
var request = require('request-promise');

var mozillaUrl = 'https://publicsuffix.org/list/public_suffix_list.dat';
var domainCache = new Map();
var assumedDomainPrefixLength = 3;

function getList(){
    var options = {
        url : mozillaUrl,
        method : 'GET',
        json : true
    };
    return request(options).then(function(response){
        return Promise.resolve(response);
    },function(error){
        return Promise.reject(new Error('The domain name service is down'));
    });
}
function getDomain(url){
    if(!url){
        return Promise.reject('The url seems to be malformed.');
    }
    if(!domainCache.size){
        return new Promise(function(res,rej){
            setTimeout(function(){
                 getDomain(url).then(function(ans){
                     res(ans);
                 });
            },2000);
        });
    }
    if(Array.isArray(url)){
        return getDomainFromList(url);
    }
    var splitUrl = url.length ? url.split('.') : [];
    if(!splitUrl || !splitUrl.length){
        return Promise.reject('The input url is not valid. Please try again');
    }
    return Promise.resolve(domainParseInternal(url,url.split('.').length - assumedDomainPrefixLength ));
}
function domainParseInternal(url,index){
    if(index > url.split('.').length){
        return -1;
    }
    var urlToSearch = url.split('.').slice(index).join('.');
    if(domainCache.get(urlToSearch) == 1){
        return url.split('.')[index-1];
    }
    return domainParseInternal(url,index+1);
}
function getDomainFromList(urlList){
    return Promise.map(urlList, function(url){
        return getDomain(url).then(function(domainList){
            return domainList;
        }, function(error){
            return "Could not find a suitable domain for this url";
        });
    });
}
function filterAndPopulateCache(body){
    if(!body){
        return;
    }
    body = body.split('\n');
    if(!body.length){
        return;
    }
    body.forEach(function(element){
        if(element.indexOf('/')> -1){
            return;
        }
        domainCache.set(element,1);
    });
}

(function init(){
    console.log('Initialising the Module. Caching the results. Please wait for a while');
    return getList().then(function(list){
        filterAndPopulateCache(list);
        console.log("Cache populate successfully");
    },function(error){
        console.log("Something went wrong. Please report the issue on github.");
    });
})();

module.exports = {
    getDomain : getDomain
};