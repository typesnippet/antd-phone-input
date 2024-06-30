import arEG from "antd/es/locale/ar_EG";
import bnBD from "antd/es/locale/bn_BD";
import csCZ from "antd/es/locale/cs_CZ";
import elGR from "antd/es/locale/el_GR";
import esES from "antd/es/locale/es_ES";
import faIR from "antd/es/locale/fa_IR";
import frCA from "antd/es/locale/fr_CA";
import glES from "antd/es/locale/gl_ES";
import hrHR from "antd/es/locale/hr_HR";
import idID from "antd/es/locale/id_ID";
import jaJP from "antd/es/locale/ja_JP";
import kmKH from "antd/es/locale/km_KH";
import koKR from "antd/es/locale/ko_KR";
import lvLV from "antd/es/locale/lv_LV";
import mnMN from "antd/es/locale/mn_MN";
import nbNO from "antd/es/locale/nb_NO";
import nlNL from "antd/es/locale/nl_NL";
import ptPT from "antd/es/locale/pt_PT";
import siLK from "antd/es/locale/si_LK";
import srRS from "antd/es/locale/sr_RS";
import thTH from "antd/es/locale/th_TH";
import ukUA from "antd/es/locale/uk_UA";
import viVN from "antd/es/locale/vi_VN";
import zhTW from "antd/es/locale/zh_TW";
import azAZ from "antd/es/locale/az_AZ";
import byBY from "antd/es/locale/by_BY";
import daDK from "antd/es/locale/da_DK";
import enGB from "antd/es/locale/en_GB";
import etEE from "antd/es/locale/et_EE";
import fiFI from "antd/es/locale/fi_FI";
import frFR from "antd/es/locale/fr_FR";
import heIL from "antd/es/locale/he_IL";
import huHU from "antd/es/locale/hu_HU";
import isIS from "antd/es/locale/is_IS";
import kaGE from "antd/es/locale/ka_GE";
import kmrIQ from "antd/es/locale/kmr_IQ";
import kuIQ from "antd/es/locale/ku_IQ";
import mkMK from "antd/es/locale/mk_MK";
import msMY from "antd/es/locale/ms_MY";
import neNP from "antd/es/locale/ne_NP";
import plPL from "antd/es/locale/pl_PL";
import roRO from "antd/es/locale/ro_RO";
import skSK from "antd/es/locale/sk_SK";
import svSE from "antd/es/locale/sv_SE";
import tkTK from "antd/es/locale/tk_TK";
import urPK from "antd/es/locale/ur_PK";
import zhCN from "antd/es/locale/zh_CN";
import bgBG from "antd/es/locale/bg_BG";
import caES from "antd/es/locale/ca_ES";
import deDE from "antd/es/locale/de_DE";
import enUS from "antd/es/locale/en_US";
import frBE from "antd/es/locale/fr_BE";
import gaIE from "antd/es/locale/ga_IE";
import hiIN from "antd/es/locale/hi_IN";
import hyAM from "antd/es/locale/hy_AM";
import itIT from "antd/es/locale/it_IT";
import kkKZ from "antd/es/locale/kk_KZ";
import knIN from "antd/es/locale/kn_IN";
import ltLT from "antd/es/locale/lt_LT";
import mlIN from "antd/es/locale/ml_IN";
import nlBE from "antd/es/locale/nl_BE";
import ptBR from "antd/es/locale/pt_BR";
import ruRU from "antd/es/locale/ru_RU";
import slSI from "antd/es/locale/sl_SI";
import taIN from "antd/es/locale/ta_IN";
import trTR from "antd/es/locale/tr_TR";
import zhHK from "antd/es/locale/zh_HK";
import * as phoneLocale from "react-phone-hooks/locale";

const locale = {
    arEG, bnBD, csCZ, elGR, esES, faIR, frCA, glES, hrHR, idID, jaJP, kmKH, koKR, lvLV,
    mnMN, nbNO, nlNL, ptPT, siLK, srRS, thTH, ukUA, viVN, zhTW, azAZ, byBY, daDK, enGB,
    etEE, fiFI, frFR, heIL, huHU, isIS, kaGE, kmrIQ, kuIQ, mkMK, msMY, neNP, plPL, roRO,
    skSK, svSE, tkTK, urPK, zhCN, bgBG, caES, deDE, enUS, frBE, gaIE, hiIN, hyAM, itIT,
    kkKZ, knIN, ltLT, mlIN, nlBE, ptBR, ruRU, slSI, taIN, trTR, zhHK,
}

type Locale = keyof typeof locale;

export default (lang: Locale) => ({
    ...locale[lang],
    PhoneInput: (phoneLocale as any)[lang],
})
