import {readOne,readAll,writeOne,stats,error,safeId} from './_shared.js';
export default async function handler(req,res){res.setHeader('Cache-Control','no-store');if(!process.env.BLOB_READ_WRITE_TOKEN)return error(res,503,'Stockage Blob non connecté : configurez BLOB_READ_WRITE_TOKEN dans Vercel.');try{
if(req.method==='GET'){const id=req.query.mine;const votes=await readAll();const mine=safeId(id)?votes.find(v=>v.id===id):null;return res.status(200).json({stats:stats(votes),mine:mine||null})}
if(req.method!=='POST')return error(res,405,'Méthode non autorisée');const {id,who,sex,name,weight}=req.body||{};
if(!safeId(id))return error(res,400,'Identifiant de participant invalide');if(typeof who!=='string'||who.trim().length<2||who.trim().length>60)return error(res,400,'Nom invalide');
if(sex===undefined&&name===undefined&&weight===undefined)return error(res,400,'Pronostic manquant');
const old=await readOne(id);if(old&&old.who!==who.trim())return error(res,409,'Identité déjà associée à ce navigateur');
const vote=old||{id,who:who.trim(),sex:null,names:[],weight:null,createdAt:new Date().toISOString()};
if(sex!==undefined){if(!['Fille','Garçon'].includes(sex))return error(res,400,'Sexe invalide');if(vote.sex)return error(res,409,'Sexe déjà enregistré');vote.sex=sex}
if(name!==undefined){if(typeof name!=='string'||!/^\p{L}[\p{L}\s’'-]{0,29}$/u.test(name.trim()))return error(res,400,'Prénom invalide');if(vote.names.some(n=>n.toLocaleLowerCase('fr')===name.trim().toLocaleLowerCase('fr')))return error(res,409,'Prénom déjà proposé');if(vote.names.length>=5)return error(res,400,'Maximum 5 prénoms');vote.names.push(name.trim())}
if(weight!==undefined){if(!Number.isInteger(weight)||weight<1000||weight>6000)return error(res,400,'Poids invalide');vote.weight=weight}
vote.updatedAt=new Date().toISOString();await writeOne(vote);return res.status(200).json({mine:vote})
}catch(e){console.error(e);return error(res,500,'Erreur de stockage. Consultez les logs Vercel.')}}
