(function(){


    module.exports = function(response){
        var responseText = "";
        const responseStatus = response.status;

        switch(responseStatus){
            case 0 : responseText = "Internet is disconnected. Please check your connection.";
                break;
            case 200 : responseText = response.responseData.message;
                break;
            case 400 : responseText = response.responseData.message;
                break;
            case 401 : responseText = "Session has expired.";
                break;
            case 403 : responseText = "Access restricted.";
                break;
            case 404 : responseText = "Error!! Requested resource was not found.";
                break;
            case 408 : responseText = "Sorry, it took longer than expected. Please try again.";
                break;
            case 409 : responseText = "You have submitted incorrect data.";
                break;
            case 413 : responseText = "Size of the data submitted is too large.";
                break;
            case 501 : responseText = "Server is not reachable. Please try again later.";
                break;
            case 502 : responseText = "Server is not reachable. Please try again later.";
                break;
            case 503 : responseText = "Server is not reachable. Please try again later.";
                break;
            case 504 : responseText = "Server is not reachable. Please try again later.";
                break;
            case 505 : responseText = "Server is not reachable. Please use https protocol.";
                break;
            default : responseText = "Error!!";
                break;
        }

        return responseText;
    };

})();