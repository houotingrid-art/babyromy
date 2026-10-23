import {list,get,put} from '@vercel/blob';
import {timingSafeEqual} from 'node:crypto';
const prefix='baby-votes/';
export function error(res,code,msg){return res.status(code).json({error:msg})}
export function safeId(id){return typeof id==='string'&&/^[0-9a-f-]{36}$/i.test(id)}
export function authorized(req){const secret='nouailhat';const input=(req.headers.authorization||'').replace(/^Bearer /,'');if(!secret||!input)return false;const a=Buffer.from(secret),b=Buffer.from(input);return a.length===b.length&&timingSafeEqual(a,b)}
export async function readOne(id){const pathname=prefix+id+'.json';const page=await list({prefix:pathname,limit:100});const blob=page.blobs.find(b=>b.pathname===pathname);if(!blob)return null;const result=await get(blob.url,{access:'private'});if(!result)return null;return await new Response(result.stream).json()}
export async function readAll(){const records=[];let cursor;do{const page=await list({prefix,limit:1000,...(cursor?{cursor}:{})});for(const blob of page.blobs){try{const result=await get(blob.url,{access:'private'});if(result){const vote=await new Response(result.stream).json();if(vote&&vote.who)records.push(vote)}}catch(e){console.error('Failed to read vote',blob.pathname,e)}}cursor=page.hasMore?page.cursor:null}while(cursor);return records}
export function stats(votes){return {sex:votes.filter(v=>v.sex).map(v=>({choice:v.sex})),names:votes.flatMap(v=>(v.names||[]).map(name=>({name}))),weights:votes.filter(v=>Number.isInteger(v.weight)).map(v=>({weight:v.weight}))}}
export async function writeOne(vote){await put(prefix+vote.id+'.json',JSON.stringify(vote),{access:'private',addRandomSuffix:false,allowOverwrite:true,contentType:'application/json'})}
