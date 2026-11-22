import { useState } from 'react';
import PhoneInput from 'react-phone-number-input/input';
import {
  getCountries,
  getCountryCallingCode,
  type Country,
} from 'react-phone-number-input';
import labels from 'react-phone-number-input/locale/en.json';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';

type Props = { value: string; onChange: (value: string) => void };

export default function PhoneNumberField({ value, onChange }: Props) {
  const [country, setCountry] = useState<Country>('IN');
  return (
    <div className="flex min-h-[54px] w-full rounded-2xl border border-[#3A3B35] bg-[#20211D] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#C8F25A]">
      <NativeSelect
        aria-label="Country calling code"
        value={country}
        onChange={(event) => {
          setCountry(event.target.value as Country);
          onChange('');
        }}
        className="w-[105px] shrink-0 [&_select]:h-full [&_select]:rounded-none [&_select]:border-0 [&_select]:text-body [&_select]:text-[#F3F1EA] [&_select]:focus-visible:ring-0"
      >
        {getCountries().map((item) => (
          <NativeSelectOption key={item} value={item}>
            +{getCountryCallingCode(item)} {labels[item]}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <PhoneInput
        id="phone"
        country={country}
        value={value || undefined}
        onChange={(next) => onChange(next || '')}
        inputComponent={Input}
        autoComplete="tel"
        placeholder="Phone number"
        required
        className="text-body min-h-[52px] min-w-0 flex-1 rounded-none border-0 bg-transparent text-[#F3F1EA] focus-visible:ring-0 md:text-body"
      />
    </div>
  );
}
