const fetch = require("node-fetch");
const { getMainKeyboard } = require("../mainKeyboard");
const markdownTable = require('markdown-table');

const workList = async (bot, msg) => {
  const workList = await fetch(`${process.env.SERVER_URL}/WorkList`).then(res => res.json());

  const headers = ['Name', 'Description', 'Price'];
  const rows = workList.map(work => [work.name, work.description, work.price]);

  const tableString = markdownTable([headers, ...rows], { align: ['l', 'l', 'r'] });

  const PAGE_SIZE = 4096;
  const num_pages = Math.ceil(tableString.length / PAGE_SIZE);
  const pages = [];
  for (let i = 0; i < num_pages; i++) {
    const start = i * PAGE_SIZE;
    const end = (i + 1) * PAGE_SIZE;
    let page = tableString.slice(start, end);
    if (end < tableString.length && page[page.length - 1] !== tableString[end - 1]) {
      page = page.slice(0, page.lastIndexOf("\n"));
    }
    pages.push(page); // pages - массив, содержащий все страницы
  }

  for (const page of pages) {
    await bot.sendMessage(msg.chat.id, page, { parse_mode: "Markdown" });
  }
}

module.exports = { workList }
