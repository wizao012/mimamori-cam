// Code by Zapier: Input Dataに同じキーでCatch Hookの値をマッピングしてください。
const keys = ['name','tel','email','postal','address','utm_source','utm_medium','utm_campaign','utm_term','utm_content','placement','keyword','matchtype','gclid','fbclid','lpv','lp_path','source_url','referrer','submission_id','privacy_consent'];
const result = Object.fromEntries(keys.map(key => [key, inputData[key] || '']));
const date = new Date(inputData.submitted_at);
result.submitted_at = Number.isNaN(date.getTime()) ? (inputData.submitted_at || '') : date.toLocaleString('sv-SE', {timeZone:'Asia/Tokyo'});
return result;
