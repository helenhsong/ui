"use client"

import * as React from "react"
import { format } from "date-fns"
import { arSA, he } from "date-fns/locale"
import { ChevronDownIcon } from "lucide-react"
import {
  arSA as arSADayPicker,
  he as heDayPicker,
} from "react-day-picker/locale"

import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"

const translations = {
  en: {
    dir: "ltr",
    values: {
      placeholder: "Pick a date",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      placeholder: "اختر تاريخًا",
    },
  },
  he: {
    dir: "rtl",
    values: {
      placeholder: "בחר תאריך",
    },
  },
} as const

const dayPickerLocales = {
  ar: arSADayPicker,
  he: heDayPicker,
} as const

const dateFnsLocales = {
  ar: arSA,
  he: he,
} as const

type DatePickerLanguage = keyof typeof translations

type DatePickerRtlProps = {
  language?: DatePickerLanguage
}

export function DatePickerRtl({ language = "ar" }: DatePickerRtlProps) {
  const { dir, values } = translations[language]
  const [date, setDate] = React.useState<Date>()

  const dateFnsLocale =
    language === "ar"
      ? dateFnsLocales.ar
      : language === "he"
        ? dateFnsLocales.he
        : undefined
  const dayPickerLocale =
    language === "ar"
      ? dayPickerLocales.ar
      : language === "he"
        ? dayPickerLocales.he
        : undefined

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant={"outline"}
            data-empty={!date}
            className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
            dir={dir}
          />
        }
      >
        {date ? (
          format(date, "PPP", { locale: dateFnsLocale })
        ) : (
          <span>{values.placeholder}</span>
        )}
        <ChevronDownIcon data-icon="inline-end" />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" dir={dir}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
          dir={dir}
          locale={dayPickerLocale}
        />
      </PopoverContent>
    </Popover>
  )
}

export type { DatePickerLanguage, DatePickerRtlProps }
