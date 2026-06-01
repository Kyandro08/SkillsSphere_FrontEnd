const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
);

(async () => {
  const { data, error } = await supabase.rpc("get_schema_info");
  if (error) {
    const { data: t, error: e2 } = await supabase
      .from("information_schema.columns")
      .select("table_name, column_name, data_type, is_nullable")
      .in("table_schema", ["public"]);

    if (e2) {
      console.error("Error:", e2.message);
      const { data: tables } = await supabase.from("_tables").select("*", { head: true });
      console.log("Kan schema niet ophalen via API. Check Supabase dashboard -> Table Editor.");
    } else {
      const grouped = {};
      for (const row of t) {
        if (!grouped[row.table_name]) grouped[row.table_name] = [];
        grouped[row.table_name].push(`${row.column_name} (${row.data_type})`);
      }
      for (const [table, cols] of Object.entries(grouped)) {
        console.log(`\n${table}:`);
        cols.forEach((c) => console.log(`  - ${c}`));
      }
    }
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
})();
