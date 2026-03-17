"use client";

import arEG from "antd/es/locale/ar_EG";
import azAZ from "antd/es/locale/az_AZ";
import bgBG from "antd/es/locale/bg_BG";
import bnBD from "antd/es/locale/bn_BD";
import byBY from "antd/es/locale/by_BY";
import caES from "antd/es/locale/ca_ES";
import csCZ from "antd/es/locale/cs_CZ";
import daDK from "antd/es/locale/da_DK";
import deDE from "antd/es/locale/de_DE";
import elGR from "antd/es/locale/el_GR";
import enGB from "antd/es/locale/en_GB";
import enUS from "antd/es/locale/en_US";
import esES from "antd/es/locale/es_ES";
import esUS from "antd/es/locale/es_US";
import etEE from "antd/es/locale/et_EE";
import euES from "antd/es/locale/eu_ES";
import faIR from "antd/es/locale/fa_IR";
import fiFI from "antd/es/locale/fi_FI";
import frBE from "antd/es/locale/fr_BE";
import frCA from "antd/es/locale/fr_CA";
import frFR from "antd/es/locale/fr_FR";
import gaIE from "antd/es/locale/ga_IE";
import glES from "antd/es/locale/gl_ES";
import heIL from "antd/es/locale/he_IL";
import hiIN from "antd/es/locale/hi_IN";
import hrHR from "antd/es/locale/hr_HR";
import huHU from "antd/es/locale/hu_HU";
import hyAM from "antd/es/locale/hy_AM";
import idID from "antd/es/locale/id_ID";
import isIS from "antd/es/locale/is_IS";
import itIT from "antd/es/locale/it_IT";
import jaJP from "antd/es/locale/ja_JP";
import kaGE from "antd/es/locale/ka_GE";
import kkKZ from "antd/es/locale/kk_KZ";
import kmKH from "antd/es/locale/km_KH";
import kmrIQ from "antd/es/locale/kmr_IQ";
import knIN from "antd/es/locale/kn_IN";
import koKR from "antd/es/locale/ko_KR";
import kuIQ from "antd/es/locale/ku_IQ";
import ltLT from "antd/es/locale/lt_LT";
import lvLV from "antd/es/locale/lv_LV";
import mkMK from "antd/es/locale/mk_MK";
import mlIN from "antd/es/locale/ml_IN";
import mnMN from "antd/es/locale/mn_MN";
import mrIN from "antd/es/locale/mr_IN";
import msMY from "antd/es/locale/ms_MY";
import myMM from "antd/es/locale/my_MM";
import nbNO from "antd/es/locale/nb_NO";
import neNP from "antd/es/locale/ne_NP";
import nlBE from "antd/es/locale/nl_BE";
import nlNL from "antd/es/locale/nl_NL";
import plPL from "antd/es/locale/pl_PL";
import ptBR from "antd/es/locale/pt_BR";
import ptPT from "antd/es/locale/pt_PT";
import roRO from "antd/es/locale/ro_RO";
import ruRU from "antd/es/locale/ru_RU";
import siLK from "antd/es/locale/si_LK";
import skSK from "antd/es/locale/sk_SK";
import slSI from "antd/es/locale/sl_SI";
import srRS from "antd/es/locale/sr_RS";
import svSE from "antd/es/locale/sv_SE";
import taIN from "antd/es/locale/ta_IN";
import thTH from "antd/es/locale/th_TH";
import tkTK from "antd/es/locale/tk_TK";
import trTR from "antd/es/locale/tr_TR";
import ukUA from "antd/es/locale/uk_UA";
import urPK from "antd/es/locale/ur_PK";
import uzUZ from "antd/es/locale/uz_UZ";
import viVN from "antd/es/locale/vi_VN";
import zhCN from "antd/es/locale/zh_CN";
import zhHK from "antd/es/locale/zh_HK";
import zhTW from "antd/es/locale/zh_TW";
import {Locale as AntLocale} from "antd/es/locale";
import * as phoneLocale from "react-phone-hooks/locale";

const locale = {
    arEG, azAZ, bgBG, bnBD, byBY, caES, csCZ, daDK, deDE, elGR, enGB, enUS, esES, esUS,
    etEE, euES, faIR, fiFI, frBE, frCA, frFR, gaIE, glES, heIL, hiIN, hrHR, huHU, hyAM,
    idID, isIS, itIT, jaJP, kaGE, kkKZ, kmKH, kmrIQ, knIN, koKR, kuIQ, ltLT, lvLV, mkMK,
    mlIN, mnMN, mrIN, msMY, myMM, nbNO, neNP, nlBE, nlNL, plPL, ptBR, ptPT, roRO, ruRU,
    siLK, skSK, slSI, srRS, svSE, taIN, thTH, tkTK, trTR, ukUA, urPK, uzUZ, viVN, zhCN,
    zhHK, zhTW,
}

const supported: Record<string, AntLocale> = Object.fromEntries(
    Object.entries(locale).filter(([_, value]) => value !== undefined)
) as Record<string, AntLocale>

type Locale = keyof typeof supported;

export default (lang: Locale) => ({
    ...supported[lang],
    PhoneInput: {
        ...(phoneLocale as any)[lang],
        locale: lang,
    },
})
