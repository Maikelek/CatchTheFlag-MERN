# Import necessary libraries
import discord
from random import choice, randint
from requests import get
from asyncio import sleep
from os import system
import datetime
from discord.ext import commands

#variable to store statuses and passwords (it's better to store passwords in an .env file for security)
presences = [".pomoc = Príkazy", "Moderujem chat", "Ročníková práca"]
hesla = ['z4c1470k', 'l2-3nc0d1100100110ng', 'm30w', '$73gan0gr4f1k', '1n574gr4m1k', 'dzt22', ':d1sc0rd807:', 'l8-w1r3$h.4rk:', '22:59:50', 'enchantmcpass']

#Set the way the bot calls commands
intents = discord.Intents.all()
bot = commands.Bot(command_prefix=".", description="ročníková práca", help_command=None, intents=intents)
bot.remove_command('help')
#
# PRÍKAZY BOTA #
#

#Príkaz pomoc, ktorý ukáže všetky príkazy pomocou discord embed
@bot.command()  
async def pomoc(ctx):
    embedPrikazy = discord.Embed(
        description='Všetky použitelné príkazy',
        colour=discord.Colour.blue())

    embedPrikazy.set_author(name="Príkazy", icon_url="https://cdn.discordapp.com/attachments/943853451694194779/1021885037437780029/hacker.png") 
    embedPrikazy.set_footer(text="Zelinka 2022@")
    embedPrikazy.set_thumbnail(url="https://cdn.discordapp.com/attachments/943853451694194779/1021885037437780029/hacker.png")

    embedPrikazy.add_field(name=".ipServera", value="Napíše aktuálnu IP stránky", inline=False)

    embedPrikazy.add_field(name=".nahodneCislo", value="Napíše náhodné čislo v intervale", inline=False)

    # embedPrikazy.add_field(name=".macka", value="Pošle fotku mačky z API", inline=False)

    embedPrikazy.add_field(name=".korgi", value="Pošle fotku korgiho z API", inline=False)

    embedPrikazy.add_field(name=".psik", value="Pošle fotku psa z API", inline=False)

    embedPrikazy.add_field(name=".rozhodnutie", value="Vyberie medzi 1 - 2", inline=False)

    embedPrikazy.add_field(name=".ping", value="Pingne server alebo doménu", inline=False)

    embedPrikazy.add_field(name='.sprava "text"', value="Vytvorí zložku s vašim menom a v nej vami zadaný text", inline=False)

    embedPrikazy.add_field(name='.spravaSubor', value="Pošle vám do osobného chatu súbor, ktorý ste vytvorili vrchným príkazom", inline=False)

    await ctx.send(embed=embedPrikazy)

#Príkaz komunikuje s API pomocou knižnice requests. Ukladá Data vo forme jsonu číta ho a následne posiela používateľom
# @bot.command() 
# async def macka(ctx):
#     response = get('http://aws.random.cat//meow')
#     data = response.json()
#     await ctx.send(data['file'])


#Totožný princíp ako príkaz vyššie iba iná API
@bot.command() 
async def korgi(ctx):
    response = get('https://dog.ceo/api/breed/pembroke/images/random')
    data = response.json()
    await ctx.send(data['message'])

#Podobný príkaz ako korgi iba posiela náhodného psa nie vybanú rasu
@bot.command()
async def psik(ctx):
    response = get('https://dog.ceo/api/breeds/image/random')
    data = response.json()
    await ctx.send(data['message'])

#Vyberá medzi 1-2 prakticky hod mincou
@bot.command() 
async def rozhodnutie(ctx):
    await ctx.send(choice("12"))

#Pinguje server a zistí či je online alebo offline/neexistuje
@bot.command()
async def ping(ctx, ip=None):
    if ip == None:
        await ctx.send("Zadaj IP alebo Doménu")
    else:
        response = system(f"ping -c 1 {ip}")
        if response == 0:
            await ctx.send("Server je online")
        else:
            await ctx.send("Server je offline alebo neexistuje")

#Bot je hostnutý v mojej sieti a zvyčajne sa mi mení IP
#Aby každý vedel na akej IP je hostnutý aj server tak je využitý príkaz ipServera
#ktorý kontaktuje API zisti IP a posiela ho používateľovi
@bot.command()
async def ipServera(ctx, ip=None):
    ip = get('http://ipgrab.io').text
    await ctx.send(f'IP web servera: {ip}')

#Nahodne číslo v požadovanom intervale
@bot.command()
async def nahodneCislo(ctx, cislo1=None, cislo2=None):
    if cislo1 != None and cislo2 != None:
        if cislo1.isdigit() and cislo2.isdigit():
            cislo1.isdigit() and cislo2.isdigit()
            random = randint(int(cislo1), int(cislo2))
            await ctx.send(f"Náhodné číslo {cislo1} až {cislo2} = {random} ")
        else:
            await ctx.send("Zadávaj len čísla.")
    else:
        await ctx.send("Nezadal si interval, skús znova.")

#Uloží text zadaný používateľom do .txt súboru s jeho menom
@bot.command()
async def sprava(ctx, sprava=None):
    if sprava == None:
        await ctx.send('Zadaj .text "tvoj text"')
    else:
        currentTime = datetime.datetime.now()
        timePlus = datetime.timedelta(hours=2)
        currentTime = currentTime + timePlus
        file = open(f"{ctx.message.author.name}.txt", "a")
        file.write((currentTime.strftime("\n%Y-%m-%d " + sprava + "\n")))
        file.close()
        await ctx.send('Správa bola pridaná do tvojej zložky')

#Pošle .txt súbor s menom používateľa vytvorený horným príkazom
@bot.command()
async def spravaSubor(ctx, kopia=None):
    await ctx.message.author.send("Tvoj súbor:")
    await ctx.message.author.send(file=discord.File(f"{ctx.message.author.name}.txt"))


#
# Príkazy, ktoré nie su volané 
#

#Táto funkcia mení aktivitu bota na discorde
async def presence_changer():  
    while True:
        await bot.change_presence(activity=discord.Game(name=choice(presences)))
        await sleep(10)
        await bot.change_presence(activity=discord.Game(name=choice(presences)))
        await sleep(10)

#Keď sa bot spustí vypíše jeho údaje do konzoly
@bot.event 
async def on_ready():

    bot.loop.create_task(presence_changer())
    print("....................")
    print("Logged as: ")
    print("Name: " + bot.user.name)
    print("ID: " + str(bot.user.id))
    print("....................")

#Ak používateľ zadá neexistujúci príkaz
@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        await ctx.send("Príkaz neexistuje pre príkazy napíš .pomoc")

#Keď sa používateľ pripojí na server
@bot.event
async def on_member_join(member):
    guild = bot.get_guild(1021823112679014434)
    channelWelcome = bot.get_channel(1021823114239279148)
    await channelWelcome.send(f"Vitaj {member.mention}🥳. Vezmi si rolu v roomke #rola#.")

#Keď sa používateľ odpojí zo servera
@bot.event
async def on_member_remove(member):
    channelWelcome = bot.get_channel(1022115906622586941)
    await channelWelcome.send(f"{member} sa odpojil 😥")

#Ak používateľ zadá reakciu na konkrétnu správu
@bot.event
async def on_raw_reaction_add(payload):
    messageId = 1023312361714622534
    
    if messageId == payload.message_id:
        member = payload.member
        guild = member.guild

        emoji = payload.emoji.name

        if emoji == "hrac":
            role = discord.utils.get(guild.roles, name="Hráč")
        elif emoji == "student":
            role = discord.utils.get(guild.roles, name="Študent SPŠE")

        await member.add_roles(role)

#Bot číta správy
@bot.listen() 
async def on_message(message): 
    if message.author == bot.user:
        return

    #Ak sa v mienosti bot-spravy objaví správa bez . na začiatku 
    if message.channel.id == 1021886430953340939:
        if message.content[0] != ".":
            await message.channel.send(f'Tu používaj iba príkazy. {message.author.mention}')

    #Ak sa v správe nachádza heslo
    for heslo in hesla:
        if heslo in message.content:
            await message.channel.send(f"{message.author} sa pokúsil/a povedať heslo a správa bola zmazaná.")
            await message.delete()




#Bot Token
bot.run("Token")
