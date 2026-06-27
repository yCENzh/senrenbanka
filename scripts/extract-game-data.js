import { readFileSync, writeFileSync } from 'fs';

const sql = readFileSync('serenbanka_sql.sql', 'utf8');

function parseInsert(sql, tableName, columns) {
  const regex = new RegExp(
    'INSERT INTO `' + tableName + '` VALUES\\s*(.+?);\\s*$',
    'ms'
  );
  const match = sql.match(regex);
  if (!match) {
    console.error(`No INSERT found for table ${tableName}`);
    return [];
  }

  const valuesStr = match[1];
  const rows = [];
  let i = 0;

  while (i < valuesStr.length) {
    // Find opening paren
    while (i < valuesStr.length && valuesStr[i] !== '(') i++;
    if (i >= valuesStr.length) break;
    i++; // skip (

    const fields = [];
    let current = '';
    let inString = false;
    let wasQuoted = false;

    while (i < valuesStr.length) {
      const ch = valuesStr[i];

      if (inString) {
        if (ch === "'" && valuesStr[i + 1] === "'") {
          current += "'";
          i += 2;
          continue;
        }
        if (ch === "'") {
          inString = false;
          i++;
          continue;
        }
        current += ch;
        i++;
        continue;
      }

      // Not in string
      if (ch === "'") {
        inString = true;
        wasQuoted = true;
        i++;
        continue;
      }

      if (ch === ',') {
        if (!wasQuoted && current.trim() === '') {
          fields.push({ val: null, quoted: false });
        } else {
          fields.push({ val: current, quoted: wasQuoted });
        }
        current = '';
        wasQuoted = false;
        i++;
        continue;
      }

      if (ch === ')') {
        if (!wasQuoted && current.trim() === '') {
          fields.push({ val: null, quoted: false });
        } else {
          fields.push({ val: current, quoted: wasQuoted });
        }
        i++;
        break;
      }

      current += ch;
      i++;
    }

    if (fields.length === columns.length) {
      const row = {};
      for (let j = 0; j < columns.length; j++) {
        const { val, quoted } = fields[j];
        if (val === null) {
          row[columns[j]] = null;
        } else if (!quoted && val === 'NULL') {
          row[columns[j]] = null;
        } else if (!quoted && /^-?\d+$/.test(val)) {
          row[columns[j]] = Number(val);
        } else {
          row[columns[j]] = val;
        }
      }
      rows.push(row);
    } else if (fields.length > 0) {
      console.warn(`${tableName}: expected ${columns.length}, got ${fields.length} (id=${fields[0]})`);
    }
  }

  return rows;
}

const plotColumns = [
  'plot_id', 'text', 'sayingpeople', 'right_face',
  'read_people', 'read_face', 'left_people', 'left_face',
  'middle_people', 'middle_face', 'right_people', 'jump', 'isto',
  'left_pose', 'middle_pose', 'right_pose', 'read_pose',
  'left_pose_type', 'read_pose_type', 'right_pose_type',
  'middle_pose_type', 'sound', 'voice', 'music'
];
const plot = parseInsert(sql, 'plot', plotColumns);

const mainColumns = ['plot_id', 'background', 'chapter'];
const main = parseInsert(sql, 'main', mainColumns);

const jumpColumns = ['jump', 'plot_id1', 'plot_id2', 'optionText1', 'optionText2', 'stroyArc1', 'stroyArc2'];
const jump = parseInsert(sql, 'jump', jumpColumns);

console.log(`Parsed: plot=${plot.length}, main=${main.length}, jump=${jump.length}`);

const output = `// Auto-generated from serenbanka_sql.sql — do not edit manually
export const plot = ${JSON.stringify(plot, null, 2)};

export const main = ${JSON.stringify(main, null, 2)};

export const jump = ${JSON.stringify(jump, null, 2)};
`;

writeFileSync('src/game-data.js', output);
console.log('Written to src/game-data.js');
