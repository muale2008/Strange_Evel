module.exports = {
  pattern: "alive",
  desc: "Check if bot is online",
  category: "general",
  use: ".alive",
  filename: __filename,

  execute: async (conn, message, m, { from, reply, sender }) => {
    try {
      // Bot PP
      let botPp;
      try {
        botPp = await conn.profilePictureUrl(conn.user.id, "image");
      } catch {
        botPp = "https://files.catbox.moe/nmcqfa.jpg";
      }

      // System & uptime
      const os = require("os");
      const uptime = process.uptime();
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
      const usedMem = ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(1);

      const senderTag = "@" + sender.split("@")[0];
      const date = new Date().toLocaleString("fr-FR", { hour12: false });

      // Alive message
      const caption = `
╭───𝚂𝚈𝚂𝚃𝙴𝙼 𝚂𝚃𝙰𝚃𝚄𝚂🥷────
│ Bot : *STRANGE Mᴅ Mɪɴɪ Bᴏᴛ*
│ Uptime : *${days}d ${hours}h ${minutes}m ${seconds}s*
│ User : ${senderTag}
│ Date : *${date}*
│
│© 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈🥷𝚂TRANGE 𝙼𝙳 𝙼𝙸𝙽𝙸 𝙱𝙾𝚃
╰────────────────

⟢ System: *${os.type()} ${os.release()}*
⟢ CPU: *${os.cpus().length} Cores*
⟢ RAM: *${usedMem}GB / ${totalMem}GB*

⟢ Status: ✅ Online & Operational
`.trim();

      await conn.sendMessage(from, {
        image: { url: botPp },
        caption,
        mentions: [sender]
      }, { quoted: message });

    } catch (error) {
      console.error("Alive error:", error);
      reply("❌ Unable to display system status.");
    }
  }
};
