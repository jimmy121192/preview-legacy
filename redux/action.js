
export function changePage(page){
    return {
        type:"CHANGE_PAGE",
        page: page
    }
}

export function changeNavPage(page){
    return {
        type:"CHANGE_NAVPAGE",
        Navpage: page
    }
}

export function changeNavPageToTab(page,settings){
    return {
        type:"CHANGE_NAVPAGETOTAB",
        Navpage: page,
        page: settings
    }
}
export function updateBarcode(upc){
    return {
        type:"UPDATE_BARCODE",
        barcode: upc,
        
    }
}


export function keywordSeach(keyword){
    return {
        type:"KEYWORD_SEARCH",
        keyword: keyword
    }
}
export function updateTime(time){
    return {
        type:"UPDATE_TIME",
        occuredTime: time
    }
}

export function exportProduct(json){
    return {
        type:"EXPORT_PRODUCT",
        json: json
    }
}

export function updateproduct(productname,productId){
    return {
        type:"UPDATE_PRODUCT",
        productname: productname,
        productId: productId
    }
}
export function flash(mode){
    return {
        type:"TOGGLE_FLASH",
        mode: mode
    }
}


export function userfname(firstname){
    return {
        type:"USER_FIRSTNAME",
        firstname:firstname
    }
}
export function userlname(lastname){
    return {
        type:"USER_LASTNAME",
        lastname:lastname
    }
}
export function newProdImg(newProdImg){
    return {
        type:"NEW_PRODUCTIMG",
        newProdImg: newProdImg
    }
}

export function clearHistory(mode){
    return {
        type:"CLEARHISTORY",
        mode: mode
    }
}

export function newProduct(name,manu,price,desc){
    return {
        type:"NEW_PRODUCT",
        name: name,
        manu: manu,
        price: price,
        desc: desc
    }
}



export function changeTheme(bgcol,navcol,tabcol,ptext,stext,radiocol,thelogo,bottomcol, radioval, homebutt, ttext){
    return {
      type:"CHANGETHEME",
        bgcol: bgcol,
        navcol: navcol,
        tabcol: tabcol,
        ptext: ptext,
        stext: stext,
        radiocol: radiocol,
        thelogo: thelogo,
        bottomcol: bottomcol,
        radioval: radioval,
        homebutt: homebutt,
        ttext: ttext
    }
}
