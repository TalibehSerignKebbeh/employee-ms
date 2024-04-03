import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import isValid from "date-fns/isValid"


export const FormatDate = (date, formatStr) => {
    return format(parseISO(date), formatStr)
}