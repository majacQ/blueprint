/*
 * Copyright 2022 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const ns = "[Blueprint]";

export const DATERANGEINPUT_NULL_VALUE =
    `${ns} <DateRangeInput2> value cannot be null. Pass undefined to clear the value and operate in` +
    " uncontrolled mode, or pass [null, null] to clear the value and continue operating in controlled mode.";

export const DATEINPUT_INVALID_DEFAULT_TIMEZONE = `${ns} <DateInput2> was provided an invalid defaultTimezone, defaulting to Etc/UTC instead`;