import arEG from "antd/locale/ar_EG";
import bnBD from "antd/locale/bn_BD";
import csCZ from "antd/locale/cs_CZ";
import elGR from "antd/locale/el_GR";
import esES from "antd/locale/es_ES";
import faIR from "antd/locale/fa_IR";
import frCA from "antd/locale/fr_CA";
import glES from "antd/locale/gl_ES";
import hrHR from "antd/locale/hr_HR";
import idID from "antd/locale/id_ID";
import jaJP from "antd/locale/ja_JP";
import kmKH from "antd/locale/km_KH";
import koKR from "antd/locale/ko_KR";
import lvLV from "antd/locale/lv_LV";
import mnMN from "antd/locale/mn_MN";
import nbNO from "antd/locale/nb_NO";
import nlNL from "antd/locale/nl_NL";
import ptPT from "antd/locale/pt_PT";
import siLK from "antd/locale/si_LK";
import srRS from "antd/locale/sr_RS";
import thTH from "antd/locale/th_TH";
import ukUA from "antd/locale/uk_UA";
import viVN from "antd/locale/vi_VN";
import zhTW from "antd/locale/zh_TW";
import azAZ from "antd/locale/az_AZ";
import byBY from "antd/locale/by_BY";
import daDK from "antd/locale/da_DK";
import enGB from "antd/locale/en_GB";
import etEE from "antd/locale/et_EE";
import fiFI from "antd/locale/fi_FI";
import frFR from "antd/locale/fr_FR";
import heIL from "antd/locale/he_IL";
import huHU from "antd/locale/hu_HU";
import isIS from "antd/locale/is_IS";
import kaGE from "antd/locale/ka_GE";
import kmrIQ from "antd/locale/kmr_IQ";
import kuIQ from "antd/locale/ku_IQ";
import mkMK from "antd/locale/mk_MK";
import msMY from "antd/locale/ms_MY";
import neNP from "antd/locale/ne_NP";
import plPL from "antd/locale/pl_PL";
import roRO from "antd/locale/ro_RO";
import skSK from "antd/locale/sk_SK";
import svSE from "antd/locale/sv_SE";
import tkTK from "antd/locale/tk_TK";
import urPK from "antd/locale/ur_PK";
import zhCN from "antd/locale/zh_CN";
import bgBG from "antd/locale/bg_BG";
import caES from "antd/locale/ca_ES";
import deDE from "antd/locale/de_DE";
import enUS from "antd/locale/en_US";
import euES from "antd/locale/eu_ES";
import frBE from "antd/locale/fr_BE";
import gaIE from "antd/locale/ga_IE";
import hiIN from "antd/locale/hi_IN";
import hyAM from "antd/locale/hy_AM";
import itIT from "antd/locale/it_IT";
import kkKZ from "antd/locale/kk_KZ";
import knIN from "antd/locale/kn_IN";
import ltLT from "antd/locale/lt_LT";
import mlIN from "antd/locale/ml_IN";
import myMM from "antd/locale/my_MM";
import nlBE from "antd/locale/nl_BE";
import ptBR from "antd/locale/pt_BR";
import ruRU from "antd/locale/ru_RU";
import slSI from "antd/locale/sl_SI";
import taIN from "antd/locale/ta_IN";
import trTR from "antd/locale/tr_TR";
import uzUZ from "antd/locale/uz_UZ";
import zhHK from "antd/locale/zh_HK";
import * as phoneLocale from "react-phone-hooks/locale";

const locale = {
    arEG, bnBD, csCZ, elGR, esES, faIR, frCA, glES, hrHR, idID, jaJP, kmKH, koKR, lvLV,
    mnMN, nbNO, nlNL, ptPT, siLK, srRS, thTH, ukUA, viVN, zhTW, azAZ, byBY, daDK, enGB,
    etEE, fiFI, frFR, heIL, huHU, isIS, kaGE, kmrIQ, kuIQ, mkMK, msMY, neNP, plPL, roRO,
    skSK, svSE, tkTK, urPK, zhCN, bgBG, caES, deDE, enUS, euES, frBE, gaIE, hiIN, hyAM,
    itIT, kkKZ, knIN, ltLT, mlIN, myMM, nlBE, ptBR, ruRU, slSI, taIN, trTR, uzUZ, zhHK,
}

type Locale = keyof typeof locale;

export default (lang: Locale) => ({
    ...locale[lang],
    PhoneInput: (phoneLocale as any)[lang],
})
