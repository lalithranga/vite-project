import { createClient } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.VITE_PROJEC_URL;
const supabaseKey = import.meta.env.VITE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default function mediaUpload(file) {
	return new Promise((resolve, reject) => {
        if(file == null){
            reject("No file selected")
        }

		const timestamp = new Date().getTime();
		const fileName = timestamp + file.name;

		supabase.storage
			.from("images")
			.upload(fileName, file, {
				cacheControl: "3600",
				upsert: false,
			})
			.then(() => {
				const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
					.data.publicUrl;
				resolve(publicUrl);
			}).catch(()=>{
                reject("Error uploading file")
            })
	});
}