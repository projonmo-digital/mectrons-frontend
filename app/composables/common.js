export const useCommonFun = () => {
    function convertToSlug(str) {
        return String(str)
            .normalize('NFKD') // split accented characters into their base characters and diacritical marks
            .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
            .trim() // trim leading or trailing whitespace
            .toLowerCase() // convert to lowercase
            .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-'); // remove consecutive hyphens
    }


    let parseText = function(text, limit) {
        if (text.length > limit)
            for (let i = limit; i > 0; i--){
                if(text.charAt(i) === ' ' && (text.charAt(i-1) != ','||text.charAt(i-1) != '.'||text.charAt(i-1) != ';')) {
                    return text.substring(0, i) + '...';
                }
            }
        else
            return text;
    };


    // Image Zoom
    function imageZoom(){
        const productImage = document?.querySelector('.imageZoom');

        productImage?.addEventListener('mouseover', () => {
            productImage.style.transform = 'scale(3)';
        });
    
        productImage?.addEventListener('mouseout', () => {
            productImage.style.transform = 'scale(1)';
        });
    
        productImage?.addEventListener('mousemove', (e) => {
            const { offsetX, offsetY, target } = e;
            const { offsetWidth: width, offsetHeight: height } = target;
            const x = (offsetX / width) * 100;
            const y = (offsetY / height) * 100;
        
            return productImage.style.transformOrigin = `${x}% ${y}%`;
        });
    }


    // default Profile Pic
    function defaultProfilePic(data){
        return data?.indexOf("https://placehold.co");
    }
  
    return { convertToSlug, parseText, imageZoom, defaultProfilePic }
  }

  