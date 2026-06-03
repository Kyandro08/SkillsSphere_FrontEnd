import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { supabase } from '@/lib/supabase';



export default function ProfileScreen() {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("tb_user_skills")
        .select("level_id, tb_skills(skill_name), tb_levels(level_name)")
        .eq("user_id", "7");
      if (error) { console.log("SUPABASE ERROR:", error); setSkills([{ error: error.message }]); }
      else if (data) { console.log("DATA:", data); setSkills(data); }
    })();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {skills.map((s, i) => (
        <ThemedView type="backgroundElement" key={i} style={styles.card}>
          <ThemedText>{s.error || s.tb_skills?.skill_name}</ThemedText>
          {!s.error && <ThemedText>Level: {s.tb_levels?.level_name}</ThemedText>}
        </ThemedView>
      ))}
    </ThemedView>
  );
}

//const { data: skillsList } = await supabase.from("tb_skills").select("*");

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
});
