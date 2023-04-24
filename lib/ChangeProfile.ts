import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";


const imageMimeType = /image\/(png|jpg|jpeg)/i;

export class ChangeProfile  {


    
    // async changeImage(fileDataURL: any) {
    //     const currentUser = currentUserHooks();

    //     let image = fileDataURL?.readAsDataURL;
    //     let response = await axios.put('/api/putImage', { image });

    //     mutate({
    //         ...currentUser,
    //         image: response?.data?.image
    //     });

    // }
  
    // createFileReader(file: any){
    //     let fileReader, isCancel = false;

    //     if (file) {
    //         fileReader = new FileReader();
    //         fileReader.onload = (e) => {
    //             if (!e.target && !isCancel) return alert("error");

    //             this.changeImage(e.target);

    //         }
    //         fileReader.readAsDataURL(file);
            
    //     }
    // }

    // changeHandler(e: any) {
    //     const file = e.target.files[0];
    //     if (!file.type.match(imageMimeType)) {
    //         alert("Image mime type is not valid");
    //         return;
    //     }
    //     this.createFileReader(file);
    // }

}
