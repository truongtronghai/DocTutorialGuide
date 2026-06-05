# Code Explanation

This component combines:

- **Yup** → validation schema
- **React Hook Form** → form state management
- **Ant Design RangePicker** → date range input
- **TypeScript** → type safety

---

# 1. Validation Schema

```ts
const schema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  contactEmail: yup.string().email().required(),
  notificationEmail: yup.string().email().required(),
  createdAt: yup.string().required(),
  license: yup.string().required(),

  licenseRangeDate: yup
    .array()
    .of(yup.mixed<Dayjs>())
    .length(2, "Please select a date range")
    .required("Please select a date range"),

  remediationCount: yup.string().required(),
  tenant: yup.string().required(),
  tenantLicense: yup.string().required(),
  users: yup.string().required(),
  addedDate: yup.string().required(),
  summary: yup.string().required(),

  accountId: yup.string().optional(),
});
```

Defines all validation rules for the form.

---

## Email Fields

```ts
email: yup.string().email().required()
```

Requires:

- value must be a string
- value must be a valid email
- value cannot be empty

Examples:

✅ `abc@gmail.com`

❌ `abc`

❌ ``

---

## Optional Field

```ts
accountId: yup.string().optional()
```

May contain:

```ts
undefined
```

or

```ts
"123"
```

No validation error if omitted.

---

## Date Range Validation

```ts
licenseRangeDate: yup
  .array()
  .of(yup.mixed<Dayjs>())
  .length(2, "Please select a date range")
  .required("Please select a date range")
```

Meaning:

1. Must be an array.
2. Every item should be a `Dayjs` object.
3. Array must contain exactly **2 items**.
4. Array cannot be missing.

Valid:

```ts
[
  dayjs("2025-01-01"),
  dayjs("2025-12-31")
]
```

Invalid:

```ts
[]
```

```ts
[dayjs()]
```

```ts
[dayjs(), dayjs(), dayjs()]
```

---

# 2. Type Inference

```ts
type AccountFormData = yup.InferType<typeof schema>;
```

Generates a TypeScript type from the Yup schema.

Equivalent to something similar:

```ts
type AccountFormData = {
  fullName: string;
  email: string;
  contactEmail: string;
  notificationEmail: string;
  createdAt: string;
  license: string;
  licenseRangeDate: Dayjs[];
  remediationCount: string;
  tenant: string;
  tenantLicense: string;
  users: string;
  addedDate: string;
  summary: string;
  accountId?: string;
};
```

Benefit:

- No duplicate type definitions.
- TypeScript always stays synchronized with Yup.

---

# 3. Extract Ant Design RangePicker

```ts
const { RangePicker } = DatePicker;
```

Instead of writing:

```tsx
<DatePicker.RangePicker />
```

you can write:

```tsx
<RangePicker />
```

---

# 4. Edit Mode Detection

```ts
const isEditMode = !!props.id;
```

Converts any value into a boolean.

Examples:

```ts
props.id = "123"  => true
props.id = ""     => false
props.id = null   => false
props.id = undefined => false
```

Used to determine:

- Add mode
- Edit mode

---

# 5. React Hook Form Setup

```ts
const {
  register,
  handleSubmit,
  formState: { errors },
  control,
  reset,
  trigger,
  setValue,
} = useForm<AccountFormData>({
  resolver: yupResolver(schema),
  mode: "onBlur",
  reValidateMode: "onBlur",
  defaultValues: { ... }
});
```

---

## `register`

Connects native HTML inputs.

Example:

```tsx
<input {...register("fullName")} />
```

---

## `handleSubmit`

Validates form before submission.

```ts
handleSubmit(onSubmit)
```

Flow:

```text
User clicks Submit
        ↓
Validate form
        ↓
Valid? → onSubmit(data)
Invalid? → show errors
```

---

## `errors`

Contains validation errors.

Example:

```ts
errors.email?.message
```

Could be:

```ts
"email is a required field"
```

---

## `control`

Used by `Controller`.

Required for controlled components such as:

- Ant Design Select
- Ant Design DatePicker
- Ant Design RangePicker
- React Select

Example:

```tsx
<Controller
  control={control}
  ...
/>
```

---

## `reset`

Resets form values.

Example:

```ts
reset();
```

or

```ts
reset({
  fullName: "John"
});
```

---

## `trigger`

Manually runs validation.

Example:

```ts
trigger("email");
```

Validates only the email field.

---

## `setValue`

Programmatically changes a field value.

Example:

```ts
setValue("fullName", "John");
```

Same effect as user typing:

```text
John
```

---

# 6. Validation Modes

```ts
mode: "onBlur",
reValidateMode: "onBlur"
```

### Initial Validation

```ts
mode: "onBlur"
```

Validation occurs when user leaves a field.

Example:

```text
Focus email
    ↓
Type invalid value
    ↓
Leave field
    ↓
Show error
```

---

### Revalidation

```ts
reValidateMode: "onBlur"
```

After an error exists:

```text
Fix field
    ↓
Leave field again
    ↓
Revalidate
```

---

# 7. Default Values

```ts
defaultValues: {
  fullName: "",
  ...
  licenseRangeDate: []
}
```

Initial form state.

Without this:

```ts
field.value
```

might be:

```ts
undefined
```

With this:

```ts
field.value
```

is:

```ts
[]
```

for the date range field.

---

# 8. Why Controller Is Needed

```tsx
<Controller
  control={control}
  name="licenseRangeDate"
```

`RangePicker` is a **controlled component**.

It does not expose a standard HTML API that `register()` understands.

Therefore:

❌ Not recommended

```tsx
<RangePicker {...register("licenseRangeDate")} />
```

✅ Correct

```tsx
<Controller
  control={control}
  name="licenseRangeDate"
  ...
/>
```

`Controller` acts as an adapter between:

```text
React Hook Form
        ↔
Ant Design Component
```

---

# 9. Controller Render Function

```tsx
render={({ field }) => {
```

`field` contains:

```ts
field.value
field.onChange
field.onBlur
field.name
field.ref
```

Think of it as:

```ts
register()
```

but for controlled components.

---

# 10. Setting RangePicker Value

```tsx
value={
  Array.isArray(field.value) &&
  field.value.length === 2
    ? [field.value[0], field.value[1]]
    : undefined
}
```

Purpose:

```ts
field.value
```

may initially be:

```ts
[]
```

But Ant Design expects:

```ts
[Dayjs, Dayjs]
```

or

```ts
undefined
```

So:

```ts
[]
```

becomes:

```ts
undefined
```

until two dates are selected.

---

# 11. Handling Date Changes

```tsx
onChange={dates =>
  field.onChange(dates ? [dates[0], dates[1]] : [])
}
```

When user selects:

```text
Jan 1 → Jan 31
```

AntD provides:

```ts
dates
```

and you save:

```ts
[
  dates[0],
  dates[1]
]
```

into React Hook Form state.

If cleared:

```ts
[]
```

is stored.

---

# 12. Handling Blur

```tsx
onBlur={() => {
  field.onBlur();
  trigger("licenseRangeDate");
}}
```

Two things happen:

### Step 1

```ts
field.onBlur();
```

Tells React Hook Form:

```text
This field was touched.
```

---

### Step 2

```ts
trigger("licenseRangeDate");
```

Forces validation immediately.

This is important because Ant Design's `RangePicker` does not always trigger React Hook Form validation exactly like a native input.

Without this:

```text
Select date
Leave field
No validation
```

can occur.

With this:

```text
Leave field
    ↓
Validate immediately
    ↓
Show error instantly
```

---

# 13. Error Display

```tsx
<p className="text-(--red)">
  {errors.licenseRangeDate?.message || "\u00A0"}
</p>
```

Displays validation message.

If error exists:

```text
Please select a date range
```

Otherwise:

```ts
"\u00A0"
```

renders a non-breaking space.

Purpose:

```text
Keep layout height stable
```

Without it:

```text
Error appears
↓
Layout jumps
```

With it:

```text
Reserved space always exists
```

so the UI does not shift.

---

# Overall Flow

```text
User opens form
        ↓
defaultValues loaded
        ↓
User selects date range
        ↓
Controller updates RHF state
        ↓
field.onChange(...)
        ↓
User leaves field
        ↓
trigger("licenseRangeDate")
        ↓
Yup validates
        ↓
errors updated
        ↓
Error message displayed
```
